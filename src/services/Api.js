const BASE_URL = process.env.REACT_APP_BASE_URL

export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  UPLOAD_API: BASE_URL + "/course/upload",
}

export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
  GET_ALL_APPROVED_INSTRUCTOR_DATA_API: BASE_URL + "/profile/getAllAprovedInstructorData",
  GET_ALL_UNAPPROVED_INSTRUCTOR_DATA_API: BASE_URL + "/profile/getAllUnApprovedInstructorData",
  APPROVE_INSTRUCTORS_API: BASE_URL + "/profile/approveInstructors",
}

export const courseEndpoints = {
  CREATE_CATEGORY_API: BASE_URL + "/classroom/createClassroom",
  GET_TIME_TABLE_API: BASE_URL + "/classroom/getTimeTable",
}

export const categories = {
  CATEGORIES_API: BASE_URL + "/classroom/getClassrooms",
}

export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
  UPLOAD_API:BASE_URL+'/profile/uploadFile'
}