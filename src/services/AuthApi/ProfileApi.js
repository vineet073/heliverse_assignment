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

    result = response?.data?.courses;
  } catch (error) {
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastID);
  return result
}
  
export async function getAllApprovedInstructorsData(token){
  const toastID=toast.loading("Loading...");
  try {
    const response=await ApiConnector("GET",profileEndpoints.GET_ALL_APPROVED_INSTRUCTOR_DATA_API,null,
    {
      "Authorization":`Bearer ${token}`
    });

    return response;
  } catch (error) {
    toast.error("Could Not Get Instructor Data")
  }finally{
    toast.dismiss(toastID);
  }

}

export async function getAllUnApprovedInstructorsData(token){
  const toastID=toast.loading("Loading...");
  try {
    const response=await ApiConnector("GET",profileEndpoints.GET_ALL_UNAPPROVED_INSTRUCTOR_DATA_API,null,
    {
      "Authorization":`Bearer ${token}`
    });

    return response;
  } catch (error) {
    toast.error("Could Not Get Instructor Data")
  }finally{
    toast.dismiss(toastID);
  }

}

export async function approveInstructors(checkedInstructors,token){
  const toastID=toast.loading("Loading...");
  try {
    const response=await ApiConnector("POST",profileEndpoints.APPROVE_INSTRUCTORS_API,{checkedInstructors},
    {
      "Authorization":`Bearer ${token}`
    });

    return response;
  } catch (error) {
    toast.error("Could Not Get Instructor Data")
  }finally{
    toast.dismiss(toastID);
  }

}