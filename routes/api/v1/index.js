//include express
const express = require('express');

//create a router
const router = express.Router();

//redirect all the doctors routes to doctors.js
router.use('/doctors', require('./doctors'));

//export router
module.exports = router;