const express = require('express');
const router = express.Router();
const absensiController = require('../controller/absensiController.js');
const checkLocMiddleware = require('../middleware/checkLocation.js');

router.post('/masuk', checkLocMiddleware, absensiController.absenMasuk);
router.post('/keluar', checkLocMiddleware, absensiController.absenKeluar);

module.exports = router;