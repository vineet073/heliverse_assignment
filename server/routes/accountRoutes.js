const express = require("express");
const router = express.Router();
const { isAuthorized,isStudent, isInstructor } = require("../middlewares/authorization");

const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  getEnrolledCourses,
  updateDisplayPicture,
  instructorDashboard
} = require("../controllers/Profile");

router.delete("/deleteProfile", isAuthorized, deleteAccount)
router.put("/updateProfile", isAuthorized, updateProfile)
router.get("/getUserDetails", isAuthorized, getAllUserDetails)
router.get("/getEnrolledCourses", isAuthorized,isStudent, getEnrolledCourses)
router.put("/updateDisplayPicture", isAuthorized, updateDisplayPicture)
router.get("/instructorDashboard", isAuthorized, isInstructor, instructorDashboard)

module.exports = router