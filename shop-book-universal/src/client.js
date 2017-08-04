"use strict"
//REACT
import React from 'react';
import ReactDOM,{render } from 'react-dom';
import {Provider} from 'react-redux';
//REACT_ROUTER
import {Router,Route, IndexRoute, browserHistory, hashHistory} from 'react-router';

import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
// import reducers
import rootReducer from './reducers/index';
//import actions
import { addToCart } from './actions/cartActions';
import {postBooks, deleteBooks,updateBooks} from './actions/bookActions';
//STEP 1 create the store
const middleware = applyMiddleware(thunk,logger);
//WE WILL PASS INITIAL STATE FROM SERVER STORE
const initialState = window.INITIAL_STATE;
const store = createStore(rootReducer,initialState, middleware);


//STEP 2 create and dispatch actions

import routes from './routes';


ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>
,
  document.getElementById('app')
)
