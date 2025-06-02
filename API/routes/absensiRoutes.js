const express = require('express');
const router = express.Router();
const absensiController = require('../controller/absensiController.js')

router.post('/masuk', absensiController.absenMasuk);
router.post('/keluar', absensiController.absenKeluar);

module.exports = router;