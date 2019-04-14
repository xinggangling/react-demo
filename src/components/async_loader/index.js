import React from 'react';
import Loadable from 'react-loadable';

export default (asyncCom) => Loadable({
  loader: asyncCom,
  loading() {
    return <div>Loading...</div>
  }
})
