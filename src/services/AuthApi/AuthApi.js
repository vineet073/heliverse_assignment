import React from 'react';
import { endpoints } from '../Api';
import { toast } from 'react-hot-toast';
import ApiConnector from '../ApiConnector';
import { useDispatch } from 'react-redux';
import { setLoading, setToken } from '../../slices/authSlice';
import {useNavigate } from 'react-router-dom';
import { setUser } from '../../slices/profileSlice';
import { resetCart } from '../../slices/cartSlice';


const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
  } = endpoints


export function sendOTP(email,navigate){
    return async (dispatch)=>{
        // const toastID=toast.loading(<div className='spinner'></div>);
        dispatch(setLoading(true));

        try {
            const response=await ApiConnector("POST",SENDOTP_API,{
                email,
                //checkUserPresent:true
            })
            console.log("SEND OTP API RESPONSE....",response);
            console.log(response.data);

            if(!response.data){
                throw new Error(response.data.message)
            }

            toast.success("OTP sent successfully");
            navigate("/verify-email");

        } catch (error) {
            console.log("SEND OTP Error...",error);
            toast.error("Could not send otp");
        }

        dispatch(setLoading(false));
        // toast.dismiss(toastID);
    }

}


export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){
    return async (dispatch)=>{
        // const toastID=toast.loading("Loading....");   
        dispatch(setLoading(true));     

        try {
            const response=await ApiConnector("POST",SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp
            })
            console.log("SIGN UP API RESPONSE....",response);
            console.log(response.data);

            if(!response.data){
                throw new Error(response.data.message)
            }

            toast.success("Signup successfully");
            navigate("/login");

        } catch (error) {
            console.log("Sign up error...",error);
            toast.error("Could not signup");
            navigate("/singup")
        }

        dispatch(setLoading(false));
        // toast.dismiss(toastID);
    }
}


export function login(    
    email,
    password,navigate
){
    return async (dispatch)=>{
        // const toastID=toast.loading("Loading....");
        dispatch(setLoading(true));
        

        try {
            const response=await ApiConnector("POST",LOGIN_API,{                
                email,
                password
            })
            console.log("LOGIN API RESPONSE....",response);
            console.log(response.data);

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
            console.log("Login error...",error);
            toast.error("Could not login");
            navigate("/login")
        }

        dispatch(setLoading(false));
        // toast.dismiss(toastID);
    }
}

export function resetPasswordToken(email,setEmailSent){
    
    return async (dispatch)=>{
        // const toastID=toast.loading("Loading....");
        dispatch(setLoading(true));

        try {
            const response=await ApiConnector("POST",RESETPASSTOKEN_API,{
                email                
            })
            console.log("Reset token API RESPONSE....",response);
            console.log(response.data);

            if(!response.data){
                throw new Error(response.data.message)
            }

            toast.success("Email sent successfully");
            setEmailSent(true);

        } catch (error) {
            console.log("SEND OTP Error...",error);
            toast.error("Could not send otp");
        }

        dispatch(setLoading(false));
        // toast.dismiss(toastID);
    }

}

export function resetPassword(password, confirmPassword, token) {
    return async(dispatch) => {
      dispatch(setLoading(true));
      try{
        const response = await ApiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});
  
        console.log("RESET Password RESPONSE ... ", response);
  
  
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Password has been reset successfully");
      }
      catch(error) {
        console.log("RESET PASSWORD TOKEN Error", error);
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