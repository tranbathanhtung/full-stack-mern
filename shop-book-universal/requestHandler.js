"use strict"
import axios from 'axios';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import rootReducer from './src/reducers/index';
import routes from './src/routes';
function handleRender(req,res) {
   axios.get('http://localhost:3001/books')
   .then(function(response){
    //  let myHtml = JSON.stringify(response.data);
    //  res.render('index',{myHtml});

     // step 1: Create a redux store on the Server
      const store = createStore(rootReducer, {"books":{"books":response.data}});
     // step 2: Get initial state from the store
     const initialState = JSON.stringify(store.getState()).replace(/<\/script/g,'<\\/script').replace(/<!--/g,'<\\!--');


     //step 3: Implement react-router on the server to intercept client request and define what to do with them
     const Routes ={
       routes: routes,
       location: req.url
     }

     match(Routes, function(err, redirect, props){


       if(err) {res.status(500).send("Error full filling the request"); }
       else if(redirect){
         res.status(302, redirect.pathname+ redirect.search)
       }
       else if(props){
         const reactComponent = renderToString(
           <Provider store={store}>
             <RouterContext {...props}/>
           </Provider>
         );
         res.status(200).render('index',{reactComponent, initialState});
       }
         else {
          
           res.status(400).send("Not Found")

       }
     })

   }).catch(err=>{
     console.log('#Initial Server-side rendering error',err);
   })

}

module.exports = handleRender;
