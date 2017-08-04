"use strict"
//REACT
import React from 'react';
import ReactDOM,{render } from 'react-dom';

//REACT_ROUTER
import {Router,Route, IndexRoute, browserHistory, hashHistory} from 'react-router';


// import reducers

//import actions

//STEP 1 create the store



import BooksList from './components/pages/booksList';

import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';

//STEP 2 create and dispatch actions

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={BooksList} ></IndexRoute>
      <Route path="/admin" component={BooksForm}></Route>
      <Route path="/cart" component={Cart}></Route>

    </Route>
  </Router>

);


export default routes;
