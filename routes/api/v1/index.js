//include express
const express = require('express');

//create a router
const router = express.Router();

const passport = require('passport');
//redirect all the doctors routes to doctors.js
router.use('/doctors', require('./doctors'));
router.use('/patients', require('./patients'));
router.use('/register_patient', require('./register-patient'));

//export router
module.exports = router;