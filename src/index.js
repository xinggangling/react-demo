import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app';

ReactDOM.render(<App />, document.getElementById('container'), () => {
  console.log('页面渲染完毕')
})
