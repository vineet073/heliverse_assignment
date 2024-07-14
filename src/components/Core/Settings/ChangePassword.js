import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../Common/IconBtn';
import { updatePassword } from '../../../services/AuthApi/SettingApi';
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'

const ChangePassword = () => {
  const {token}=useSelector((state)=>state.auth);
  const navigate=useNavigate();
  const [showPassword,setShowPassword]=useState(false);
  const [newPassword,setNewPassword]=useState(false);
  const [confirmNewPassword,setConfirmNewPassword]=useState(false);

  const {
    register,
    handleSubmit,
    formState:{errors},
  }=useForm();

  const onSubmitHandler = async (data) => {
    try {
      await (updatePassword(token, data))
    } catch (error) {
      throw new Error(error)
    }
  }
  return (
    <div className='gap-5 bg-richblack-800 p-9 rounded-md border-[1px] border-richblack-600 mt-12'>
      <div className='text-2xl text-richblack-5 mb-5'>Profile Information</div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className='flex flex-col gap-2 relative mb-7'>
              <label className='text-sm text-richblack-5' htmlFor='oldPassword'>Old Password</label>
              <input 
              name='oldPassword'
              id='oldPassword'
              type={showPassword ? "text" : "password"}
              className='w-full rounded-md py-2 px-2 bg-richblack-700 style focus:outline-0 text-richblack-5'
              placeholder='Enter old password'
              {...register("oldPassword",{required:true})}              
              />

              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>

                {
                  errors.oldPassword &&(
                    <span className='text-yellow-100'>
                      Please enter your first name
                    </span>
                  )
                }
             
          </div>

          <div className='flex flex-col gap-2 relative mb-7'>
              <label className='text-sm text-richblack-5' htmlFor='newPassword'>New Password</label>
              <input 
              name='newPassword'
              id='newPassword'
              type={newPassword ? "text" : "password"}
              className='w-full rounded-md py-2 px-2 bg-richblack-700 style focus:outline-0 text-richblack-5'
              placeholder='Enter new password'
              {...register("newPassword",{required:true})}              
              />

              <span
                onClick={() => setNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                {newPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>

                {
                  errors.newPassword &&(
                    <span className='text-yellow-100'>
                      Please enter your first name
                    </span>
                  )
                }
             
          </div>

          <div className='flex flex-col gap-2 relative'>
              <label className='text-sm text-richblack-5' htmlFor='confirmNewPassword'>Confirm New Password</label>
              <input 
              name='confirmNewPassword'
              id='confirmNewPassword'
              type={confirmNewPassword ? "text" : "password"}
              className='w-full rounded-md py-2 px-2 bg-richblack-700 style focus:outline-0 text-richblack-5'
              placeholder='Renter new password'
              {...register("confirmNewPassword",{required:true})}              
              />

              <span
                onClick={() => setConfirmNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                {confirmNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>

                {
                  errors.confirmNewPassword &&(
                    <span className='text-yellow-100'>
                      Please enter your first name
                    </span>
                  )
                }
             
          </div>

          <div className="mt-8 flex gap-3">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">
            Cancel
          </button>
          <IconBtn type="submit" text="Save" customClasses={"bg-yellow-50 text-richblack-900 font-semibold"}/>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
