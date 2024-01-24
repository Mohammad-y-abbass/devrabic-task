const express = require('express');
const router = express.Router();
const semestersController = require('../controllers/semester.controller');

router.post('/', semestersController.createSemester);

module.exports = router;
