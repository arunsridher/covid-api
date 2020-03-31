//include express
const express = require('express');
//create a router
const router = express.Router();

//include passport for authentication
const passport = require('passport');

//include patients controller to process the correspondinga actions
const patientsController = require('../../../controllers/api/v1/patientsController');

//authenticate using jwt strategy
router.post('/', passport.authenticate('jwt', {session:false}), patientsController.registerPatient);

//export router
module.exports = router;