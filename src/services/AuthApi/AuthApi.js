import { endpoints } from '../Api';
import { toast } from 'react-hot-toast';
import ApiConnector from '../ApiConnector';
import { setLoading, setToken } from '../../slices/authSlice';
import { setUser } from '../../slices/profileSlice';
import { resetCart } from '../../slices/cartSlice';


const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    UPLOAD_API
} = endpoints


export function sendOTP(email,navigate){
    return async (dispatch)=>{
        dispatch(setLoading(true));

        try {
            const response=await ApiConnector("POST",SENDOTP_API,{
                email,
            })

            if(!response.data){
                throw new Error(response.data.message)
            }

            toast.success("OTP sent successfully");
            navigate("/verify-email");

        } catch (error) {
            toast.error("Could not send otp");
        }

        dispatch(setLoading(false));
    }

}

export async function uploadFile(resume){
    const toastID=toast.loading("Loading...");
    let result=null;
    try {
        const formData = new FormData();
        formData.append("resume", resume); 

        const response=await ApiConnector("POST",UPLOAD_API,formData,{
            "Content-Type":"multipart/ form-data"
        });
        if(!response.data.success){
            throw new Error("Error in uploading resume");
        }
        toast.success("Resume uploaded successfully");
        result=response?.data?.data;
    } catch (error) {
        toast.error(error.message);
    }
    toast.dismiss(toastID);
    return result;
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    resume,
    navigate
){
    return async (dispatch)=>{
        dispatch(setLoading(true));     

        try {
            const response=await ApiConnector("POST",SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
                resume
            })

            if(!response.data){
                throw new Error(response.data.message)
            }

            toast.success("Signup successfully");
            navigate("/login");

        } catch (error) {
            toast.error("Could not signup");
            navigate("/signup")
        }
        dispatch(setLoading(false));
    }
}


export function login(    
    email,
    password,navigate
){
    return async (dispatch)=>{
        dispatch(setLoading(true));    
        try {
            const response=await ApiConnector("POST",LOGIN_API,{                
                email,
                password
            })

            if(!response.data){
                throw new Error(response.data.message)
            }

            toast.success("Login successfully");
            dispatch(setToken(response.data.token));

            const userImage=response.data?.user?.image?
            response.data.user.image:
            `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

            dispatch(setUser({...response.data.user,image:userImage}));
            localStorage.setItem("user",JSON.stringify(response.data.user));
            localStorage.setItem("token",JSON.stringify(response.data.token));

            navigate("/dashboard/my-profile");

        } catch (error) {
            toast.error("Could not login");
            navigate("/login")
        }
        dispatch(setLoading(false));
    }
}

export function resetPasswordToken(email,setEmailSent){
    
    return async (dispatch)=>{
        dispatch(setLoading(true));

        try {
            const response=await ApiConnector("POST",RESETPASSTOKEN_API,{
                email                
            })

            if(!response.data){
                throw new Error(response.data.message)
            }

            toast.success("Email sent successfully");
            setEmailSent(true);

        } catch (error) {
            toast.error("Could not send otp");
        }

        dispatch(setLoading(false));
    }

}

export function resetPassword(password, confirmPassword, token) {
    return async(dispatch) => {
      dispatch(setLoading(true));
      try{
        const response = await ApiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token}); 
  
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Password has been reset successfully");
      }
      catch(error) {
        toast.error("Unable to reset password");
      }
      dispatch(setLoading(false));
    }
}

export function logout(navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/")
        dispatch(setLoading(false));
    }
}