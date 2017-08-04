"use strict"
import axios from 'axios';
//GET CART
export function getCart(cart){
  return function(dispatch){
    axios.get('/api/cart')
    .then(res=>{
      dispatch({type:"GET_CART",payload:res.data})
    }).catch(err=>{
      dispatch({type:"GET_CART_REJECTED",payload:"There was an error"})
    })
  }
}
// ADD TO CART
export function addToCart(cart) {
    return function(dispatch){
      axios.post('/api/cart',cart)
      .then(res=>{
        dispatch({type:"ADD_TO_CART",payload:res.data})
      }).catch(err=>{
        dispatch({type:"ADD_TO_CART_REJECTED",payload:"There was an error"})
      })
    }
}



export function deleteCart(cart) {
  return function(dispatch){
    axios.post('/api/cart',cart)
    .then(res=>{
      dispatch({type:"DELETE_CART",payload:res.data})
    }).catch(err=>{
      dispatch({type:"DELETE_CART_REJECTED",payload:"There was an error"})
    })
  }
}


export function updateCart(_id, unit,cart) {
  let currentCart = cart;
  const indexToUpdate = currentCart.findIndex(cart=>cart._id=== _id);
  console.log(currentCart[indexToUpdate]);
  const newCartToUpdate = {
    ...currentCart[indexToUpdate],
    quantity: currentCart[indexToUpdate].quantity + unit
  };

  let cartUpdate =[...currentCart.slice(0,indexToUpdate),newCartToUpdate,...currentCart.slice(indexToUpdate+1)];
  return function(dispatch){
    axios.post('/api/cart',cartUpdate)
    .then(res=>{
      dispatch({type:"UPDATE_CART",payload:res.data})
    }).catch(err=>{
      dispatch({type:"UPDATE_CART_REJECTED",payload:"There was an error"})
    })
  }

}
