const express = require('express');
const router = express.Router();
const taskManagementAccess = require('../controller/taskManagementAccess.js');

router.get('/get-task', taskManagementAccess.GetAssignedTask);

module.exports = router;