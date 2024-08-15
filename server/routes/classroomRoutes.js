const express=require('express');
const router=express.Router();
const { uploadFile } = require('../controllers/UploadFile');
const { isAuthorized, isAdmin } = require('../middlewares/authorization');
const { createClassroom,getAllClassrooms, getTimeTable } = require('../controllers/Classroom');
    

router.post("/createClassroom", isAuthorized, isAdmin, createClassroom)
router.get("/getClassrooms", getAllClassrooms)
router.post("/upload",uploadFile);
router.post("/getTimeTable",getTimeTable)

module.exports = router

