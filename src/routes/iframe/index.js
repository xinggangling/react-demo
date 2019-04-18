import React from 'react';
import * as nsfwjs from 'nsfwjs';

export default class Iframe extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
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
  render() {
    return <div />
  }
}
