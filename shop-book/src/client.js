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
const store = createStore(rootReducer, middleware);


import BooksList from './components/pages/booksList';

import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';

//STEP 2 create and dispatch actions



ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={BooksList} ></IndexRoute>
        <Route path="/admin" component={BooksForm}></Route>
        <Route path="/cart" component={Cart}></Route>

      </Route>
    </Router>
  </Provider>
,
  document.getElementById('app')
)
