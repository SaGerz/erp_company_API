const express = require('express');
const router = express.Router();
const taskManagementAccess = require('../controller/taskManagementAccess.js');

router.get('/get-task', taskManagementAccess.GetAssignedTask);
router.patch('/update-status/:id/status', taskManagementAccess.UpdateStatusAssignedTask);

module.exports = router;