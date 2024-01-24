const express = require('express');
const router = express.Router();
const classesController = require('../controllers/class.controller');

router.post('/', classesController.createClass);

module.exports = router;
