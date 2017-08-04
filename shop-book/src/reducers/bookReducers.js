"use strict"

//STEP 3 define reducers
export function bookReducers(state ={ books:[] }, action){
  switch(action.type){
    case "GET_BOOK":
    return {...state,books:[...action.payload]}
    break;
    case "POST_BOOK":
       return {
         ...state,
         books:[...state.books, ...action.payload],
         msg:'Saved! Click to continue',
         style: 'success',
         validation:'success'

       }
       break;
    case "RESET_BUTTON":
       return {
         ...state,

         msg:null,
         style: "primary",
         validation:null
       }
       break;
    case "POST_BOOK_REJECTED":

      return {
        ...state,
        msg:"Please, try again",
        style: 'danger',
        validation:'danger'
      }
      break;

    case "DELETE_BOOK":
      let currentBook = [...state.books];
      const indexToDelete = currentBook.findIndex(book=>book._id == action.payload); // 2 != "2" nen phai dung == khong dung ===
      return {books: [...currentBook.slice(0,indexToDelete),...currentBook.slice(indexToDelete+1)]}
      break;
    case "UPDATE_BOOK":
      let currentBookz = [...state.books];
      const indexToUpdate = currentBookz.findIndex(book=>book._id===action.payload._id);
      const newBookToUpdate = {
        ...currentBookz[indexToUpdate],
        title: action.payload.title,
        price: action.payload.price,
        description: action.payload.description
      };

      return {books: [...currentBookz.slice(0,indexToUpdate),newBookToUpdate,...currentBookz.slice(indexToUpdate+1)]}
      break;

  }
  return state;
}
