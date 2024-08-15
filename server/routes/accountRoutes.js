const express = require("express");
const router = express.Router();
const { isAuthorized, isAdmin, isInstructor } = require("../middlewares/authorization");

const {
updateProfile,
deleteAccount,
getAllApprovedInstructorDetails,
getAllUnApprovedInstructorDetails,
getAllUserDetails,
approveInstructors,
getStudentByClassroom
} = require("../controllers/Profile");
const { uploadFile } = require("../controllers/UploadFile");

router.put("/deleteProfile", isAuthorized, deleteAccount)
router.put("/updateProfile", isAuthorized, updateProfile)
router.get("/getUserDetails", isAuthorized, getAllUserDetails)
router.get("/getAllAprovedInstructorData", isAuthorized, isAdmin, getAllApprovedInstructorDetails)
router.get("/getAllUnApprovedInstructorData", isAuthorized, getAllUnApprovedInstructorDetails)
router.post("/instructorDashboard",isAuthorized,getStudentByClassroom)
router.post('/approveInstructors', isAuthorized, approveInstructors)
router.post("/uploadFile",isAuthorized,uploadFile);

module.exports = router