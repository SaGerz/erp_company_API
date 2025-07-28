const express = require('express');
const router = express.Router();
const absensiAccess = require('../controller/absensiAccessController.js');

router.get('/get-absensi', absensiAccess.getAllAbsensi);
router.get('/export-absensi-all', absensiAccess.exportAbsensiAll);
router.get('/export-absensi-month', absensiAccess.exportAbsensiByMonth);

module.exports = router
