"use strict"

import { combineReducers } from 'redux';


import { bookReducers } from './bookReducers';
import {cartReducer} from './cartReducers';
const rootReducer = combineReducers({
  books: bookReducers,
  cart: cartReducer
});

export default rootReducer;
