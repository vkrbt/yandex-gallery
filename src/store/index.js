import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';

/* eslint-disable no-underscore-dangle */
const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f;

export const store = createStore(reducers, {}, compose(applyMiddleware(thunk), enhancers));
