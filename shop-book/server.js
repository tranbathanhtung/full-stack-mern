"use strict"
const express = require('express');

const path = require('path');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');




const app = express();
//Middleware to define folder for static fils

app.use('/assets',express.static(__dirname + '/public'));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');




app.get('*',(req,res)=>{
  res.render("index");
});


app.listen(3000,(e)=>{
  if(e) throw e;
  console.log("App is running in port 3000");
});
