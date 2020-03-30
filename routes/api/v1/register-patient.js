//include express
const express = require('express');
//create a router
const router = express.Router();

const passport = require('passport');
const patientsController = require('../../../controllers/api/v1/patientsController');

router.post('/', passport.authenticate('jwt', {session:false}), patientsController.registerPatient);

//export router
module.exports = router;