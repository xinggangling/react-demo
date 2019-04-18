import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { MainLayout } from 'components/layouts/index';
import { PrintPreview, ImageCreator, IdentifyPicture, Iframe } from 'routes';
import { hot } from 'react-hot-loader/root';
import './app.less';
import '@babel/polyfill';
// import 'assets/js/web-worker';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/iframe" component={Iframe} />
        <MainLayout>
          <Route exact path="/" component={PrintPreview} />
          <Route path="/image_creator" component={ImageCreator} />
          <Route path="/identify_picture" component={IdentifyPicture} />
        </MainLayout>
      </Switch>
    )
  }
}

export default hot(App);
