//include express
const express = require('express');

//create a router
const router = express.Router();

//include doctors api
const doctorsController = require('../../../controllers/api/v1/doctorsController');

router.post('/register', doctorsController.register);
router.post('/login', doctorsController.login);

//export router
module.exports = router;