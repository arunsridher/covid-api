//include express
const express = require('express');
const port = 8000;

//include database
const db = require('./config/mongoose');

//include passport library
const passport = require('passport');

//include passport jwt config file
const passportJWT = require('./config/passport-jwt-strategy');

const app = express();


//middleware to parse form data
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//redirect all urls to routes index.js
app.use('/', require('./routes'));

//start the express on specefied port
app.listen(port, function(err){
  if(err){
    console.log(`Error in running the server ${err}`);
  }
  console.log(`Express is running on the port: ${port}`);
});

