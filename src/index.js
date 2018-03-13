import React from 'react';
import ReactDOM from 'react-dom';
import 'reset-css/_reset.scss';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// eslint-disable-next-line react/jsx-filename-extension
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
