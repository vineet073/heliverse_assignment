import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/AuthApi/AuthApi';
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

const ResetPassword = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
    const {loading}=useSelector((state)=>state.auth);
    const [formData,setFormData]=useState({
        password:"",
        confirmPassword:""
    })
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);

    const {password,confirmPassword}=formData;

    const handleOnChange=(e)=>{
        setFormData((prevData)=>({
            ...prevData,
            [e.target.name]:e.target.value
        }))
    }

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const token=location.pathname.split("/").at(-1);
        dispatch(resetPassword(password,confirmPassword,token,navigate));
    }

  return (
    <div className='text-richblack-200 flex items-center justify-center my-auto'>
      {loading?<div className='spinner'></div>
      :<div className='w-[25%]'>
        <h1 className='text-richblack-5 text-3xl mb-3 font-medium'>Choose New Password</h1>
        <p className='text-richblack-200 mb-3'>Almost done. Enter your new password and youre all set.</p>

        <form className='text-richblack-50' onSubmit={handleOnSubmit}>
            <label className='relative text-sm'>
                <p>New password <sup className='text-pink-200'>*</sup></p>
                <input
                name='password'
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleOnChange}
                placeholder='Enter password'
                style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full mt-1 mb-5 rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5" 
                />
                <span onClick={()=>setShowPassword((prevState)=>!prevState)}
                className='absolute text-richblack-100 text-xl right-2 -bottom-0'>
                {showPassword?
                <AiOutlineEyeInvisible/>
                :<AiOutlineEye/>}
                </span>

            </label>

            <label className='relative text-sm'>
                <p>Confirm new password <sup className='text-pink-200'>*</sup></p>
                <input
                    name='confirmPassword'
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleOnChange}
                    placeholder='Enter password'
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full mt-1 rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5" 
                    />
                    <span onClick={()=>setShowConfirmPassword((prevState)=>!prevState)}
                    className='absolute text-richblack-100 text-xl right-2 -bottom-0'>
                    {showConfirmPassword?
                    <AiOutlineEyeInvisible/>
                    :<AiOutlineEye/>}
                </span>
                
            </label>

            <button
                type="submit"
                className="mt-6 w-full mb-3 rounded-[8px] font-semibold bg-yellow-50 py-[8px] px-[12px] text-richblack-900">
                Reset Password   
            </button>

            <Link to={"/login"} className='flex items-center text-sm gap-1'>
                <BiArrowBack/>
                <p>Back to login</p> 
            </Link>
        </form>
      </div>}
    </div>
  )
}

export default ResetPassword
