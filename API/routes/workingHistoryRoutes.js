const express =require('express');
const router = express.Router();
const workingHistoryController = require('../controller/workingHistoryController.js');

router.post('/create-task', workingHistoryController.CreateWorkingHistory);
router.get('/get-task', workingHistoryController.GetWorkingHistory);

module.exports = router;