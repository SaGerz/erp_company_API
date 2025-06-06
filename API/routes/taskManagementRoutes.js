const express = require('express');
const router = express.Router();
const taskManamentController = require('../controller/taskManagementController.js');

router.post('/create-task', taskManamentController.CreateTaskManagement);
router.put('/update-task/:id', taskManamentController.UpdateTaskManagement);

module.exports = router;