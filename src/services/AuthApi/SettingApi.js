import { toast } from "react-hot-toast";
import { settingsEndpoints } from "../Api";
import ApiConnector from "../ApiConnector";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./AuthApi";

const{
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
}=settingsEndpoints;

// export function updateDisplayPicture(token,formData) {
//     return async(dispatch)=>{
//         const toastID=toast.loading("Loading...");
//         try {
//             const response=await ApiConnector("PUT",UPDATE_DISPLAY_PICTURE_API,formData,
//             {
//                 "Content-type":"multipart/form-data",
//                 Authorization:`Bearer ${token}`
//             });

//             console.log("Update profile image respose->",response);

//             if(!response.data.sucess){
//                 throw new Error(response.data.message);
//             }
//             toast.success("Display Picture Updated Successfully");
//             dispatch(setUser(response.data.data));

//         } catch (error) {
//             console.log("Error in updating profile image->",error);
//             toast.error("Couldn't update profile image");
//         }
        
//         toast.dismiss(toastID);
//     }
// }

export function updateDisplayPicture(token, formData){
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await ApiConnector(
          "PUT",
          UPDATE_DISPLAY_PICTURE_API,
          formData,
          {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        )
        console.log(
          "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
          response
        )
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Display Picture Updated Successfully")
        dispatch(setUser(response.data.data))
      } catch (error) {
        console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
        toast.error("Could Not Update Display Picture")
      }
      toast.dismiss(toastId)
    }
}  

export function updateProfile(token, formData){
    return async(dispatch)=>{
        const toastID=toast.loading("Loading...");
        try {
            const response=await ApiConnector("PUT",UPDATE_PROFILE_API,formData,
            {
                Authorization:`Bearer ${token}`
            });

            console.log("Updated profile->",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            const userImage=response.data.updatedUserDetails.image?
            response.data.updatedUserDetails.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;

            dispatch(setUser(response.data.updatedUserDetails));       
            toast.success("Profile Updated Successfully");

        } catch (error) {
            console.log("Error in updating profile ->",error);
            toast.error("Couldn't update profile ");
        }

        toast.dismiss(toastID);
    }
}

export async function updatePassword(token, formData){

    const toastID=toast.loading("Loading...");
    try {
      const response=await ApiConnector("POST",CHANGE_PASSWORD_API,formData,
      {
        Authorization:`Bearer ${token}`
      });
      console.log("updatedPassword->",response);
      if(!response.data.success){
        throw new Error(response.data.message);
      }
  
      toast.success("Password updated successfully");
    } catch (error) {
      console.log(error);
      console.log("password can't be updated->",error.message);
      toast.error("Password Updation Failed");
    }
    toast.dismiss(toastID);

 

}

export  function deleteAccount(token, navigate){
  return async(dispatch)=>{
    const toastID=toast.loading("Loading...");
    try {
      const response=await ApiConnector("DELETE",DELETE_PROFILE_API,null,
      {
        Authorization:`Bearer ${token}`
      });
      console.log("account deleted->",response);
      if(!response.data.success){
        throw new Error(response.data.message);
      }
  
      toast.success("Account deleted successfully");
      dispatch(logout(navigate));
    } catch (error) {
      console.log(error);
      console.log("account can't be deleted->",error.message);
      toast.error("Account Deletion Failed");
    }
    toast.dismiss(toastID);

  }

}
