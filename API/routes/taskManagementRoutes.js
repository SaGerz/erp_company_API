const express = require('express');
const router = express.Router();
const taskManamentController = require('../controller/taskManagementController.js');

router.post('/create-task', taskManamentController.CreateTaskManagement);
router.put('/update-task/:id', taskManamentController.UpdateTaskManagement);
router.delete('/delete-task/:id', taskManamentController.DeleteTaskManagement);

module.exports = router;