import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi'
import { resetPasswordToken } from '../services/AuthApi/AuthApi';

const ForgotPassword = () => {
    const dispatch=useDispatch();
    const [email,setEmail]=useState('');
    const [emailSent,setEmailSent]=useState('');
    const {loading}=useSelector((state)=>state.auth);

    const handleOnSubmit=(e)=>{
      e.preventDefault();
      dispatch(resetPasswordToken(email,setEmailSent));

    }



  return (
    <div className='text-richblack-5 flex justify-center w-full h-full my-auto'>
      <div className='w-[27%]'>
      {
        loading?<div className='spinner'></div>
        :<div>
            {emailSent?<h1 className='text-3xl'>Check email</h1>:<h1 className='text-3xl'>Reset Your Password</h1>}
            {emailSent?<p className='text-richblack-200'>We have sent the reset email to {email}</p>:
            <p className='text-richblack-200'>Have no fear. We'll email you instructions to reset your password.
            If you dont have access to your email we can try account recovery</p>}
            
            <form onSubmit={handleOnSubmit}>
            {emailSent?<div></div>:
            
                <label>
                    <p className='mt-2 text-richblack-200'>Email Address <sup className='text-pink-200'>*</sup></p>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder='Enter email address'
                        style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full mt-1 rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                    />
                </label>
            }
                <button
                type="submit"
                className="mt-5 w-full mb-2 rounded-[8px] font-semibold bg-yellow-50 py-[8px] px-[12px] text-richblack-900">
                {emailSent?"Resend Email":"Send Email"}      
                </button>
            
            </form>
            
            
            

            <Link to={"/login"} className='flex items-center text-sm text-richblack-200 gap-1'>
                <BiArrowBack/>
                <p>Back to login</p> 
            </Link>
        </div>
      }
      </div>
      
    </div>
  )
}

export default ForgotPassword
