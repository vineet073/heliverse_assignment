import React from 'react';
import {useForm} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../Common/IconBtn';
import { updateProfile } from '../../../services/AuthApi/SettingApi';


const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

const EditDetails = () => {
  const {user}=useSelector((state)=>state.profile);
  const {token}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const {
    register,
    handleSubmit,
    formState:{errors},
  }=useForm();

  const onSubmitHandler = async (data) => {
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <div className='gap-5 bg-richblack-800 p-9 rounded-md border-[1px] border-richblack-600 mt-12'>
      <div className='text-2xl text-richblack-5 mb-5'>Profile Information</div>
      <form onSubmit={handleSubmit(onSubmitHandler)} className='flex flex-col gap-x-7'>
        <div className='grid grid-cols-2 gap-7'>
          <div className='flex flex-col gap-2'>
              <label className='text-sm text-richblack-5' htmlFor='firstName'>First Name</label>
              <input 
              name='firstName'
              id='firstName'
              type='text'
              className='w-full rounded-md py-2 px-2 bg-richblack-700 style focus:outline-0 text-richblack-5'
              // placeholder='Enter first name'
              {...register("firstName",{required:true})}
              defaultValue={user?.firstName}
              />
                {
                  errors.firstName &&(
                    <span className='text-yellow-100'>
                      Please enter your first name
                    </span>
                  )
                }
             
          </div>

          <div className='flex flex-col gap-2'>
              <label className='text-sm text-richblack-5' htmlFor='lastName'>Last Name</label>
              <input 
              name='lastName'
              id='lastName'
              type='text'
              className='w-full rounded-md py-2 px-2 bg-richblack-700 style text-richblack-5 focus:outline-0'
              // placeholder='Enter last name'
              {...register("lastName",{required:true})}
              defaultValue={user?.lastName}
              />
               {
                  errors.lastName &&(
                    <span className='text-yellow-100'>
                      Please enter your last name
                    </span>
                  )
                }
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='dateOfBirth' className='text-sm text-richblack-5'>Date of Birth</label>
            <input
              type='date'
              name='dateOfBirth'
              id='dateOfBirth'
              className='w-full rounded-md py-2 px-2 bg-richblack-700 text-richblack-5 style focus:outline-0'
              {...register("dateOfBirth",{
                required:{
                  value:true,
                  message:"Please Enter your date of birth"
                },
                max:{
                  value:new Date().toISOString().toString().split("T")[0],
                  message:"Invalid date of birth"
                }
              })}
              defaultValue={user?.additionalDetails?.dateOfBirth}
            />
            
            {
                errors.dateOfBirth && (
                  <span>
                    {errors.dateOfBirth.message}
                  </span>
                )
              }
          </div>

          <div className='flex flex-col gap-2'>
              <label className='text-sm text-richblack-5' htmlFor='gender'>Gender</label>
              <select
                type="text"
                name='gender'
                id='gender'
                className='w-full rounded-md py-2 px-2 bg-richblack-700 text-richblack-5 style focus:outline-0'
                {...register("gender",{required:true})}
                defaultValue={user?.additionalDetails?.gender}
              >
              {
                  genders.map((element,index)=>{
                    return(
                      <option key={index} value={element}>{element}</option>
                    )
                  })
              }
              </select>

              {errors.gender && (
                <span className="">
                  Please enter your Date of Birth.
                </span>
              )}
          </div>
          
          <div className='flex flex-col gap-2'>
              <label className='text-sm text-richblack-5' htmlFor='contactNumber'>Contact number</label>
              <input 
              name='contactNumber'
              id='contactNumber'
              type='tel'
              className='w-full rounded-md py-2 px-2 bg-richblack-700  text-richblack-5 style focus:outline-0'
              // placeholder='Enter last name'
              {...register("contactNumber", {
                  required: {
                    value: true,
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
              defaultValue={user?.additionalDetails?.contactNumber}
              />
              {
                  errors.contactNumber &&(
                    <span className='text-yellow-100'>
                      Please enter your phone number
                    </span>
                  )
                }
          </div>

          <div className='flex flex-col gap-2'>
              <label className='text-sm text-richblack-5' htmlFor='about'>About</label>
              <input 
              name='about'
              id='about'
              type='text'
              className='w-full rounded-md py-2 px-2 bg-richblack-700 text-richblack-5 style focus:outline-0'
              // placeholder='Enter last name'
              {...register("about",
              {required:true             
              })}
              defaultValue={user?.additionalDetails?.about}
              />
               {
                  errors.about &&(
                    <span className='text-yellow-100'>
                      Please write something about yourself
                    </span>
                  )
                }
          </div>
        </div>
         

          <div className="mt-8 flex gap-3">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" customClasses={"bg-yellow-50 text-richblack-900 font-semibold"}/>
        </div>
      </form>
    </div>

      

  )
}

export default EditDetails
