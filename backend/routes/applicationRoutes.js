const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { createApplication, getAllApplications, approveApplication, updateApplication } = require('../controllers/applicationController');

const uploadFields = upload.fields([
     {name: "valid_Id", maxCount: 1},
     {name: "Birth_certificate", maxCount: 1},
     {name: "form138", maxCount: 1},
     {name: "good_moral", maxCount: 1}
]);
router.post('/add', uploadFields, createApplication); // student will send an application to admin
router.get('/view', getAllApplications); // View all application
router.put('/approve/:id', approveApplication); // for admin to approve the application of student
router.put('/:edit', updateApplication); // for admin to update application information of student


module.exports = router;

