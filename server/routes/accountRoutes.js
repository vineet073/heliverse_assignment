const express = require("express");
const router = express.Router();
const { isAuthorized,isStudent, isInstructor, isAdmin } = require("../middlewares/authorization");

const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  getEnrolledCourses,
  updateDisplayPicture,
  instructorDashboard,
  getAllApprovedInstructorDetails,
  getAllUnApprovedInstructorDetails,
  approveInstructors
} = require("../controllers/Profile");

router.delete("/deleteProfile", isAuthorized, deleteAccount)
router.put("/updateProfile", isAuthorized, updateProfile)
router.get("/getUserDetails", isAuthorized, getAllUserDetails)
router.get("/getEnrolledCourses", isAuthorized,isStudent, getEnrolledCourses)
router.put("/updateDisplayPicture", isAuthorized, updateDisplayPicture)
router.get("/instructorDashboard", isAuthorized, isInstructor, instructorDashboard)
router.get("/getAllAprovedInstructorData", isAuthorized, isAdmin, getAllApprovedInstructorDetails)
router.get("/getAllUnApprovedInstructorData", isAuthorized, isAdmin, getAllUnApprovedInstructorDetails)
router.post('/approveInstructors', isAuthorized, isAdmin, approveInstructors)

module.exports = router