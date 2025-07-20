const express = require('express');
const router = express.Router();
const absensiAccess = require('../controller/absensiAccessController.js');

router.get('/get-absensi', absensiAccess.getAllAbsensi);

module.exports = router
