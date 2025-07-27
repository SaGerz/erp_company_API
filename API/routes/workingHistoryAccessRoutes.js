const express = require('express');
const router = express.Router();
const WorkingHistoryAccessController = require('../controller/workingHistoryAccessController.js');

router.get('/get-task-user/:id', WorkingHistoryAccessController.GetWorkingHistoryByUserId);

module.exports = router;