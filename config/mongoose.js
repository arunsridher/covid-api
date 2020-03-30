//include mongoose
const mongoose = require('mongoose');

//connect to the covid database mongodb
mongoose.connect('mongodb://localhost/covid', {useNewUrlParser: true});

//check if connected
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error mongodb'));
db.once('open', function() {
  // if connected
  console.log("Successfully connected to the database");
});

module.exports = db;