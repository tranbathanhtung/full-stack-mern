"use strict"

export function cartReducer(state={cart:[]}, action) {
  switch(action.type){
    case "GET_CART":
       return {
         ...state,
         cart: action.payload,
         totalAmount:total(action.payload).amount,
         totalQty: total(action.payload).qty
       }
    case "ADD_TO_CART":
    return {...state,cart:action.payload,totalAmount: total(action.payload).amount,totalQty:total(action.payload).qty}
    break;
    case "DELETE_CART":
    return {...state,cart:action.payload,totalAmount: total(action.payload).amount,totalQty:total(action.payload).qty}
    break;
    case "UPDATE_CART":

    return {...state, cart: action.payload,totalAmount: total(action.payload).amount,totalQty:total(action.payload).qty}
    break;

  }
  return state;
}

// CACULATE TOTALS
export function total(payloadArr){
  const totalAmount = payloadArr.map(cart=>cart.price*cart.quantity).reduce((a,b)=>{
    return a+b;
  },0);
  const totalQty = payloadArr.map(cart=>cart.quantity).reduce((a,b)=>{return a+b;},0);
  return {amount: totalAmount.toFixed(2), qty:totalQty};
}
