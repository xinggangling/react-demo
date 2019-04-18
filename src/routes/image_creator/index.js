import React, { Component } from 'react';
import bg from 'assets/images/bg.png';
import qr1 from 'assets/images/qr1.png';
import MC from 'mcanvas';
import Clipboard from 'clipboard';
import { message, Button } from 'antd';

export default class ImageCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      b64: '',
      width: 350,
      height: 350,
      blob: null,
      canvas: null
    }
  }
  componentWillUnmount() {
  }
  componentDidMount() {
    const { width, height } = this.state;
    let mc = new MC({
      width,
      height,
      backgroundColor: 'black',
    });

    mc.background(bg, {
      left: 0,
      top: 0,
      color: '#000000',
      type: 'crop',
    });
    this.loopDraw(mc, width, 10, () => {
      this.drawList(mc);
    });
  }
  drawList = (mc) => {
    const list = [
      {
        title: 'goods1',
        desc: 'description',
        sizeAndColor: '白色/S',
      },
      {
        title: 'goods2',
        desc: 'description...........',
        sizeAndColor: '深红/XL/SL/ML/ML',
      },
      {
        title: 'goods3',
        desc: 'descriptiondescriptiondescriptiondescriptiondescription',
        sizeAndColor: '深红/XL/SL/ML',
      },
    ];
    list.map((item, index) => {
      this.renderItem(mc, item, index, list.length - 1);
    });
  }
  caculateTextLength = (text) => {
    const number_letter_reg = /[\d|a-z]/; // 数字或者英文字母
    const letter_upcase = /[A-Z]/; // 大写字母
    const chinese_reg = /[\u4e00-\u9fa5]/; // 中文
    return text.split('').reduce((pre, item) => {
      if (number_letter_reg.test(item)) {
        return pre + 1;
      } else if (chinese_reg.test(item) || letter_upcase.test(item)) {
        return pre + 2;
      } else {
        return pre + 1;
      }
    }, 0)
  }
  dealText = (data, width) => {
    Object.keys(data).map(item => {
      if (typeof data[item] === 'string' || typeof data[item] === 'number') {
        const textLength = this.caculateTextLength(data[item], width);
        if (textLength * 8 > width) {
          data[item] = data[item].substring(0, width/8 - 3) + '...'
        }
      }
    });
    return data;
  }
  renderItem = (mc, item, index, total) => {
    const renderContent = this.dealText(item, 100);
    mc.add(qr1, {
      width: 50,
      pos: {
        x: 10,
        y: 10 + index * 70,
        // scale: 0.84,
        // rotate: 1,
      },
    }).text(`${renderContent.title}`, {
      width: '100px',
      // align:'center',
      normalStyle: {
        font: '14px helvetica neue,hiragino sans gb,Microsoft YaHei,arial,tahoma,sans-serif'
      },
      pos: {
        x: 10 + 50 + 10,
        y: 10 + index * 70  - 5,
      },
    }).text(`${renderContent.desc}`, {
      width: '100px',
      // align:'center',
      normalStyle: {
        font: '14px helvetica neue,hiragino sans gb,Microsoft YaHei,arial,tahoma,sans-serif'
      },
      pos: {
        x: 10 + 50 + 10,
        y: 10 + index * 70 + 25,
      },
    }).text(`${renderContent.sizeAndColor}`, {
      width: '100px',
      // align:'center',
      normalStyle: {
        font: '14px helvetica neue,hiragino sans gb,Microsoft YaHei,arial,tahoma,sans-serif'
      },
      pos: {
        x: 10 + 50 + 110,
        y: 10 + index * 70 + 10,
      },
    })
    if (index === total) {
      mc.draw(b64 => {
        this.setState({
          b64
        })
      });
    }
  }
  loopDraw = (mc, width, times, cb) => {
    if (times > 0) {
      mc.add(bg, {
        width,
        pos: {
          x: 0,
          y: 0,
          // scale: 0.84,
          // rotate: 1,
        },
      })
      this.loopDraw(mc, width * 2 / 3, times - 1, cb);
    } else if (times === 0) {
      mc.draw(b64 => {
        this.setState({
          b64,
          canvas: mc.canvas,
        }, () => {
          console.log('mc: ', mc)
          document.getElementById('copy-content').append(this.state.canvas)
          cb();
        })
      });
    }
  }
  copyImg = (e) => {
    // document.body.append(mc.canvas);
    console.log('this.state.canvas: ', this.state.canvas)
    const copyTriger = document.getElementById('copy-triger');
    const copyTarget = document.getElementById('copy-content');
    const clipboard = new Clipboard(copyTriger, {
      target: () => {
        return copyTarget;
      }
    });
    clipboard.on('success', e => {
      e.clearSelection();
      message.success('复制成功')
      clipboard.destroy()
    })
    clipboard.on('error', e => {
      e.clearSelection();
      message.error('复制失败')
      clipboard.destroy()
    })
  }
  render() {
    const { b64 } = this.state;
    return (
      <div>
        <div id="copy-content">
          {/* <img src={'https://xcimg.szwego.com/o_1d8hucose1s6q10sk1sk8am0v7pi.jpg?imageMogr2/auto-orient/thumbnail/!310x310r/quality/100/format/jpg'} /> */}
        </div>
        <Button id="copy-triger" type="primary" onClick={this.copyImg}>复制图片</Button>
      </div>
    )
  }
}
