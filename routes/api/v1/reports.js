//include express
const express = require('express');
//create a router
const router = express.Router();

//include passport
const passport = require('passport');

const reportsController = require('../../../controllers/api/v1/reportsController');

router.get('/:status', passport.authenticate('jwt', {session:false}), reportsController.status);

//export router
module.exports = router;