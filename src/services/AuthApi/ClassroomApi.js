import toast from "react-hot-toast";
import ApiConnector from '../ApiConnector';
import { courseEndpoints } from "../Api";

const {
    CREATE_CATEGORY_API
  } = courseEndpoints;


export async function createClassroom(title,days,startTime,endTime,token){
  const toastID=toast.loading("Loading...");
  try {
    const response=await ApiConnector("POST", CREATE_CATEGORY_API,{title,days,startTime,endTime},
      {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
    );

    return response;
      
  } catch (error) {
      toast.error(error.message);
  }
  finally{
    toast.dismiss(toastID);
  }
}

  








