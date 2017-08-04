"use strict"
import axios from 'axios';


export function getBooks(){
return function(dispatch){
  axios.get('/api/books')
  .then(res=>{
    dispatch({type:"GET_BOOK",payload:res.data})
  }).catch(err=>{
    dispatch({type:"GET_BOOK_REJECTED",payload:"There was an error while getting books"})
  })
}
  // return {
  //   type:"GET_BOOK",
  //
  //
  // }
}




export function postBooks(book){
  return function(dispatch){
    axios.post("/api/books", book)
    .then(res=>{
      dispatch({type:"POST_BOOK",payload:res.data})
    })
    .catch(err=>{
      dispatch({type:"POST_BOOK_REJECTED",payload:"There was an error while posting a new book"})
    })
  }
  // return {
  //   type:"POST_BOOK",
  //   payload: book
  //
  // }
}


export function deleteBooks(_id){
  return function(dispatch){
    axios.delete("/api/books/"+_id)
    .then(res=>{
      dispatch({type:"DELETE_BOOK",payload:_id})
    })
    .catch(err=>{
      dispatch({type:"DELETE_BOOK_REJECTED",payload:"There was an error while deleting a new book"})
    })
  }
  // return {
  //   type:"DELETE_BOOK",
  //   payload: _id
  //
  // }
}



export function updateBooks(book){
  return {
    type:"UPDATE_BOOK",
    payload: book

  }
}

// RESET FORM BUTTON
export function resetButton(){
  return {
    type:"RESET_BUTTON",


  }
}
