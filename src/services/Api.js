const BASE_URL = process.env.REACT_APP_BASE_URL

export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  UPLOAD_API: BASE_URL + "/course/upload",
}

export const questionEndpoints = {
  GET_QUESTIONS: BASE_URL + "/question/getQuestions",
  CREATE_QUESTION: BASE_URL + "/question/create",
  UPVOTE_QUESTION: BASE_URL + "/question/upvote",
  DOWNVOTE_QUESTON: BASE_URL + "/question/downvote",
}

export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
  GET_ALL_APPROVED_INSTRUCTOR_DATA_API: BASE_URL + "/profile/getAllAprovedInstructorData",
  GET_ALL_UNAPPROVED_INSTRUCTOR_DATA_API: BASE_URL + "/profile/getAllUnApprovedInstructorData",
  APPROVE_INSTRUCTORS_API: BASE_URL + "/profile/approveInstructors",
}

export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessfulEmail",
}

export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/course/createSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/createSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:BASE_URL + "/course/fetchFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRatingandReview",
  GET_CHATBOT_ANSWER_API: BASE_URL + "/course/chatbot",
  CREATE_CATEGORY_API: BASE_URL + "/course/createCategory",
}

export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getAllRatingAndReview",
}

export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
}

export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}

export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/contact",
}

export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}