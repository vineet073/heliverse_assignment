import { toast } from "react-hot-toast";
import { settingsEndpoints } from "../Api";
import ApiConnector from "../ApiConnector";

const{
    UPDATE_PROFILE_API,
    DELETE_PROFILE_API
}=settingsEndpoints;



export async function updateProfile(token, formData){
  try {
      const response=await ApiConnector("PUT",UPDATE_PROFILE_API,formData,
      {
        Authorization:`Bearer ${token}`
      });


      if(!response.data.success){
          throw new Error(response.data.message);
      }

      toast.success("Profile Updated Successfully");

  } catch (error) {
      toast.error("Couldn't update profile ");
  }

}


export async function deleteAccount(id,token){
    try {
      const response=await ApiConnector("PUT",DELETE_PROFILE_API,{id},
      {
        Authorization:`Bearer ${token}`
      });
      if(!response.data.success){
        throw new Error(response.data.message);
      }
  
      toast.success("Account deleted successfully");
    } catch (error) {
      toast.error("Account Deletion Failed");
    }


}
