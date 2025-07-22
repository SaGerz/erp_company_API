const express = require('express');
const router = express.Router();
const userKaryawanController = require('../controller/usersKaryawanController.js');

router.get('/karyawan', userKaryawanController.getAllKaryawan);

module.exports = router;