import React, { Component } from 'react';
import { Home } from 'routes';
import { hot } from 'react-hot-loader/root';

class App extends Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    )
  }
}

export default hot(App);
