const express =require('express');
const router = express.Router();
const workingHistoryController = require('../controller/workingHistoryController.js');

router.post('/create-task', workingHistoryController.CreateWorkingHistory);
router.get('/get-task', workingHistoryController.GetWorkingHistory);
router.put('/update-task/:id', workingHistoryController.UpdateWorkingHistory);
router.delete('/delete-task/:id', workingHistoryController.DeleteWorkingHistory);

module.exports = router;