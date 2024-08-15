import toast from "react-hot-toast";
import ApiConnector from "../ApiConnector";
import { profileEndpoints} from "../Api";


export async function getStudentsByClassroom(classroom,token){
  const toastID=toast.loading("Loading...");
  let result=[];
  try {
    const response=await ApiConnector("POST",profileEndpoints.GET_INSTRUCTOR_DATA_API,{classroom},
    {
      "Authorization":`Bearer ${token}`
    });

    result = response;
  } catch (error) {
    toast.error("Could Not Get Student Data")
  }
  toast.dismiss(toastID);
  return result
}
  
export async function getInstructors(token){
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

export async function getStudents(token){
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

export async function getInstructorDetailsbyId(id,token){
  const toastID=toast.loading("Loading...");
  try {
    const response=await ApiConnector("POST",profileEndpoints.APPROVE_INSTRUCTORS_API,{id},
    {
      "Authorization":`Bearer ${token}`
    });

    return response.data.instructorDetails;
  } catch (error) {
    toast.error("Could Not Get Instructor Data")
  }finally{
    toast.dismiss(toastID);
  }

}