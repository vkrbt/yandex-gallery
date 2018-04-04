import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'reset-css/_reset.scss';
import { App } from './App';
import { unregister } from './registerServiceWorker';
import './index.scss';
import { store } from './store';

/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
unregister();
