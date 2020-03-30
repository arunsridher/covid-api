//include express
const express = require('express');
//create a router
const router = express.Router();

//include passport
const passport = require('passport');

const patientsController = require('../../../controllers/api/v1/patientsController');

router.get('/:id/create_report', passport.authenticate('jwt', {session:false}), patientsController.createReport);
router.get('/:id/all_reports', passport.authenticate('jwt', {session:false}), patientsController.allReports);

//export router
module.exports = router;