//include express
const express = require('express');
//create a router
const router = express.Router();

const passport = require('passport');
const patientApi = require('../../../controllers/api/v1/patients_api');

router.post('/', passport.authenticate('jwt', {session:false}), patientApi.registerPatient);

//export router
module.exports = router;