const express = require('express');
const router = express.Router();
const taskManagementAccess = require('../controller/taskManagementAccess.js');
const upload = require('../config/upload.js');

router.get('/get-task', taskManagementAccess.GetAssignedTask);
router.patch('/update-status/:id/status', upload.single("attachment"), taskManagementAccess.UpdateStatusAssignedTask);

module.exports = router;