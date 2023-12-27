const express=require('express');
const router=express.Router();

const {isAuthorized,isStudent,isAdmin,isInstructor}=require('../middlewares/authorization');
const {createCategory,getAllCategorys,categoryPageDetails}=require('../controllers/Category');
const {createCourse,showAllCourses,getCourseDetails,editCourse,getInstructorCourses, deleteCourse, fetchFullCourseDetails}=require('../controllers/Courses');
const {createRatingandReview,getAverageRating,getAllRatingAndReview}=require('../controllers/RatingAndReview');
const {createSection,updatedSection,deleteSection}=require('../controllers/Section');
const {createSubSection,updateSubSection,deleteSubSection,}=require('../controllers/subSection');
const {updateCourseProgress}=require('../controllers/CourseProgress')


router.post("/createCourse",isAuthorized,isInstructor,createCourse);
router.post("/editCourse",isAuthorized,isInstructor,editCourse);
router.delete("/deleteCourse", deleteCourse);
router.post("/createSection",isAuthorized,isInstructor,createSection);
router.post('/updateSection',isAuthorized,isInstructor,updatedSection);
router.post('/createSubSection',isAuthorized,isInstructor,createSubSection);
router.post('/updateSubSection',isAuthorized,isInstructor,updateSubSection);
router.post('/deleteSubSection',isAuthorized,isInstructor,deleteSubSection);
router.post('/deleteSection',isAuthorized,isInstructor,deleteSection);
//to check the request method
router.post('/getCourseDetails',getCourseDetails);
router.post('/fetchFullCourseDetails',isAuthorized,fetchFullCourseDetails);
router.get('/showAllCourses',isAuthorized,isInstructor,showAllCourses);
router.get('/getInstructorCourses',isAuthorized,isInstructor,getInstructorCourses);
    

router.post("/createCategory", isAuthorized, isAdmin, createCategory)
router.get("/showAllCategories", getAllCategorys)
router.post("/getCategoryPageDetails", categoryPageDetails)

router.post("/createRatingandReview", isAuthorized, isStudent, createRatingandReview)
router.get("/getAverageRating", getAverageRating)
router.get("/getAllRatingAndReview", getAllRatingAndReview);

router.post("/updateCourseProgress", isAuthorized, isStudent, updateCourseProgress);

module.exports = router

