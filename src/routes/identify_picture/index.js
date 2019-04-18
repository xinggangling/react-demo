import React, { Component } from 'react';
import * as nsfwjs from 'nsfwjs';
import Dropzone from 'react-dropzone';
import { Button } from 'antd';
import baoshijie from 'assets/images/baoshijie.png';

import Results from './Results';
import Worker from 'assets/js/web_worker.js';

import { base642img } from 'utils/dataTypeTransform';

import './index.less';

const blurred = { filter: 'blur(30px)', WebkitFilter: 'blur(30px)' }
const clean = {}
const loadingMessage = 'Loading NSFWJS Model'
const dragMessage = 'Drag and drop an image to check'
const camMessage = 'Cam active'
const DETECTION_PERIOD = 1000

console.log('Dropzone: ', Dropzone)

export default class IdentifyPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: null,
      graphic: baoshijie,
      titleMessage: 'Please hold, the model is loading...',
      message: loadingMessage,
      predictions: [],
      droppedImageStyle: { opacity: 0.4 },
      blurNSFW: true,
      enableWebcam: false,
      loading: true,
      fileType: null,
      hardReset: false,
      startMessage: '组件初始化: ' + Date.now()
    }
  }
  componentDidMount() {
    if (window.Worker) {
      if (!window.worker) {
        window.worker = new Worker('/assets/js/web_worker.js');
        worker.postMessage({
          type: 'nsfwjs_task_start',
          message: '1'
        });
        worker.onmessage = (event) => {
          const eType = event.data.type;
          const eMessage = event.data.message;
          switch (eType) {
            case 'nsfwjs_tast_init_ok':
              let eMessageJson = JSON.parse(eMessage);
              eMessageJson.model = JSON.parse(eMessageJson.model)
              this.setState({
                message: 'model set to state ok: ' + Date.now(),
                model: eMessageJson
              }, () => {
                console.log('model: ', this.state.model)
              });
              break;
            case 'nsfwjs_tast_result':
              let droppedImageStyle = this.detectBlurStatus(eMessage)
              this.setState({
                // message: `Identified as ${predictions[0].className}`,
                predictions: eMessage,
                droppedImageStyle
              })
            default:
              break;
          }
        };
      } else {
        this.setState({
          message: 'model set to state ok: ' + Date.now(),
        });
      }
    } else {
      if (!window.model) {
        nsfwjs.load('/assets/model/').then(model => {
          window.model = model;
          console.log('model: ', model)
          this.setState({
            model,
            titleMessage: dragMessage,
            message: 'model set to state ok: ' + Date.now(),
            loading: false
          }, () => {
            console.log('model set to state ok: ', Date.now());
          })
        })
      }
    }
  }
  detectBlurStatus = (predictions, blurNSFW = this.state.blurNSFW) => {
    let droppedImageStyle = clean
    if (this.state.fileType === 'image/gif') {
      const deemedEvil = this.detectGifEvil(predictions)
      droppedImageStyle = deemedEvil > 0 && blurNSFW ? blurred : clean
    } else {
      if (blurNSFW) {
        switch (predictions[0].className) {
          case 'Hentai':
          case 'Porn':
          case 'Sexy':
            droppedImageStyle = blurred
        }
      }
    }
    return droppedImageStyle
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  detectGifEvil = predictions =>
    predictions
      .filter(c => {
        return ['Hentai', 'Porn', 'Sexy'].includes(c[0].className)
      })
      .flat().length
  checkContent = async () => {
    // Sleep bc it's grabbing image before it's rendered
    // Not really a problem of this library
    const { fileType } = this.state;
    await this.sleep(100)
    const img = this.refs.dropped;    
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height)
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    if (fileType === 'image/gif') {
      this.setState({
        message: `0% - Parsing GIF frames`,
        predictions: [],
        loading: true
      })
      const predictions = await model.classifyGif(img, {
        topk: 1,
        onFrame: ({ index, totalFrames, predictions }) => {
          const percent = ((index / totalFrames) * 100).toFixed(0)
          this.setState({
            message: `${percent}% - Frame ${index} is ${
              predictions[0].className
            }`
          })
        }
      })
      const deemedEvil = this.detectGifEvil(predictions)
      // If any frame is NSFW, blur it (if blur is on)
      const droppedImageStyle = this.detectBlurStatus(predictions)
      const gifMessage =
        deemedEvil > 0
          ? `Detected ${deemedEvil} NSFW frames`
          : 'All frames look clean'
      this.setState({
        message: `GIF Result: ${gifMessage}`,
        predictions,
        droppedImageStyle,
        loading: false
      })
    } else {
      if (window.Worker) {
        // worker.postMessage({
        //   type: 'nsfwjs_task_dealimg',
        //   message: imageData,
        // });
        const predictions = await this.state.model.classify(imageData)
        let droppedImageStyle = this.detectBlurStatus(predictions)
        this.setState({
          // message: `Identified as ${predictions[0].className}`,
          predictions,
          droppedImageStyle
        })
      } else {
        const predictions = await this.state.model.classify(imageData)
        let droppedImageStyle = this.detectBlurStatus(predictions)
        this.setState({
          // message: `Identified as ${predictions[0].className}`,
          predictions,
          droppedImageStyle
        })
      }
    }
  }
  setFile = file => {
    // drag and dropped
    const reader = new FileReader()
    reader.onload = e => {
      this.setState(
        {
          graphic: e.target.result,
          fileType: file.type
        },
        this.checkContent
      )
    }
    reader.readAsDataURL(file)
  }
  onDrop = (accepted, rejected) => {
    if (rejected.length > 0) {
      window.alert('JPG, PNG, GIF only plz')
    } else {
      let droppedImageStyle = this.state.blurNSFW ? blurred : clean
      this.setState({
        // message: 'Processing...',
        droppedImageStyle,
        hardReset: true
      })
      this.setFile(accepted[0])
    }
  }
  render() {
    const { message, graphic, predictions } = this.state;
    return (
      <div>
        <div>主线程处理</div>
        <div>
          {
            this.state.startMessage
          }
        </div>
        {
          message
        }
        <hr />
        <Dropzone
          id="dropBox"
          accept="image/jpeg, image/png, image/gif"
          className="photo-box"
          onDrop={this.onDrop}
        >
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <hr />
        {
          graphic ?
          <img
            src={graphic}
            alt="drop your file here"
            className="dropped-photo"
            style={{position: 'absolute', top: -400}}
            ref="dropped"
          />
          :
          null
        }
        <Results
          message={message}
          predictions={predictions}
        />
        <Button type="primary">22</Button>
        {/* <iframe src="http://172.16.0.122:3000/iframe"></iframe> */}
      </div>
    )
  }
}
