//include express
const express = require('express');
//create a router
const router = express.Router();

//include passport
const passport = require('passport');

const patientApi = require('../../../controllers/api/v1/patients_api');


//export router
module.exports = router;