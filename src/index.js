import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router } from "react-router-dom";
import { browserHistory } from 'utils/historyUtil';
import App from 'app';

ReactDOM.render(
  <Router history={browserHistory}>
    <App />
  </Router>,
  document.getElementById('container'), () => {
    console.log('页面渲染完毕')
  }
)
