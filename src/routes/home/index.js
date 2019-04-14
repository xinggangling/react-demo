import React, { Component } from 'react';
import baoshijie from 'assets/images/baoshijie.png';

import './index.less';

export default class Home extends Component {
  render() {
    return (
      <div>
        <img src={baoshijie} style={{width: 200, height: 120}} />
        hello, 0xg!!!1212
      </div>
    )
  }
}
