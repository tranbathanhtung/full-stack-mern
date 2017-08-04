var express = require('express');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);


var app = express();

// view engine setup


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//APIs
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "# MongoDB - connection error"))

// ====> SET UP SESSION <=====
app.use(session({
   secret: 'mySecretString',
   saveUninitialized: false,
   resave: false,
   cookie: {maxAge: 1000* 60 * 60 * 24 * 24 *2},
   store: new mongoStore({mongooseConnection: db, ttl:2 * 24 * 60 * 60})
   // ttl: 2 days * 24 hours * 60 minutes * 60 seconds
}));
// -----> SAVE TO SESSION
app.post('/cart', function(req,res){
  let cart = req.body;
  req.session.cart = cart;
  req.session.save((err)=>{
    if(err) throw err;
    res.json(req.session.cart);
  });
});
//GET SESSION
app.get('/cart',(req,res)=>{
  if(typeof req.session.cart !== 'undefined'){
    res.json(req.session.cart);
  }
});
// ====> END <=====

const Books = require('./models/books');

// ----->>> POST BOOKS <<<-----
app.post('/books',(req,res)=>{
  const book = req.body;


  Books.create(book,(err,books)=>{
    if(err) throw err;
    res.json(books);
  });
});

//---->>> GET BOOKS <<<-----
app.get('/books',(req,res)=>{
  Books.find((err,books)=>{
    if(err) throw err;
    res.json(books);
  })
});
//---->>> DELETE BOOKS <<<-----
app.delete('/books/:_id',(req,res)=>{
  let query = {_id:req.params._id};
  Books.remove(query,(err,books)=>{
    if(err) console.log("#API DELETE BOOKS", err);
    res.json(books);
  })
});
//----->>> UPDATE BOOKS <<<--------
app.put('/books/:_id',(req,res)=>{

  var book = req.body;


  var query = req.params._id;
  var update = {
    '$set':{
       title:book.title,
       description:book.description,
       image:book.image,
       price: book.price
    }
  };
  var options = {new:true};
  Books.update(query, update,(err,books)=>{
    if(err) throw err;
    res.json(books);
  })
});


// -------->>> GET BOOKS IMAGES API  <<<-----------
app.get('/images',(req,res)=>{
  const imgFolder = __dirname+'/public/images';
  // REQUIRE FILESYSTEM
  const fs = require('fs');
  fs.readdir(imgFolder,(err,files)=>{
    if(err) return console.log(err);
    const filesArr = [];
    files.forEach(file=>{
      filesArr.push({name:file});
    });
    //SEND THE JSON RESPONSE WITH THE ARRAY
    res.json(filesArr);
  })


})
//END APIs

app.listen(3001,(err)=>{
  if(err) console.log(err);
  console.log('API server is running')
})
