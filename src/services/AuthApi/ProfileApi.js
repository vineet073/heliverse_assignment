import toast from "react-hot-toast";
import ApiConnector from "../ApiConnector";
import { profileEndpoints } from "../Api";


export async function getUserEnrolledCourses(token){
    const toastId = toast.loading("Loading...")
    let result = []
    try {
      const response = await ApiConnector(
        "GET",
        profileEndpoints.GET_USER_ENROLLED_COURSES_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data.data
    } catch (error) {
      console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
      toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}

export async function getInstructorDashboard(token){
  const toastID=toast.loading("Loading...");
  let result=[];
  try {
    const response=await ApiConnector("GET",profileEndpoints.GET_INSTRUCTOR_DATA_API,null,
    {
      "Authorization":`Bearer ${token}`
    });

    console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response)
    result = response?.data?.courses;
  } catch (error) {
    console.log("GET INSTRUCTOR DASHOBARD API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastID);
  return result
}
  