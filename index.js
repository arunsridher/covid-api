//include express
const express = require('express');
const port = 8000;
const app = express();

//include database
const db = require('./config/database');

//to parse form data
app.use(express.urlencoded());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//redirect all urls to routes index.js
app.use('/', require('./routes'));

//start the express on specefied port
app.listen(port, function(err){
  if(err){
    console.log(`Error in running the server ${err}`);
  }
  console.log(`Express is running on the port: ${port}`);
});

