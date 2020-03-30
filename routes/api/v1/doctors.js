//include express
const express = require('express');

//create a router
const router = express.Router();

//include doctors api
const doctorsApi = require('../../../controllers/api/v1/doctors_api');



//export router
module.exports = router;