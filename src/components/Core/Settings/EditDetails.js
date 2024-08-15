import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../Common/IconBtn';
import { updateProfile } from '../../../services/AuthApi/SettingApi';
import { getInstructorDetailsbyId } from '../../../services/AuthApi/ProfileApi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';



const EditDetails = () => {
  const {token}=useSelector((state)=>state.auth);
  const navigate=useNavigate();
  const { id } = useParams()
  const [instructor, setInstructor] = useState({});
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  async function getInstructorDetails(){
    try {
      const instructor=await getInstructorDetailsbyId(id,token);
      setInstructor(instructor);
    } catch (error) {
      throw new Error(error);
    }  
  }
  useEffect(()=>{
    getInstructorDetails();
  },[])
  console.log("instructor",instructor);  

  const {
    register,
    handleSubmit,
    formState:{errors},
  }=useForm({
    defaultValues:{
      userName:instructor?.userName,
      email:instructor?.email,
      password:"",
      confirmPassword:"",
    }
  });

  const onSubmitHandler = async (data) => {
    data.id = instructor._id;

    try {
      const response=await updateProfile(token, data)

      if(!response.data.success){
        navigate("/dashboard/manage_instructors")
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <div className='gap-5 bg-richblack-800 p-9 rounded-md border-[1px] border-richblack-600 mt-12'>
      <div className='text-2xl text-richblack-5 mb-5'>Update Information</div>
      <form onSubmit={handleSubmit(onSubmitHandler)} className='flex flex-col gap-x-7'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-row gap-4'>
            <label className='flex flex-col gap-2 w-full' htmlFor='userName'>
                <p className='text-sm text-richblack-5'>
                  User Name <sup className="text-pink-200">*</sup>
                </p>
                <input 
                name='userName'
                id='userName'
                type='text'
                className='w-full rounded-md py-2 px-2 bg-richblack-700 style focus:outline-0 text-richblack-5'
                {...register("userName",{required:true})}
                defaultValue={instructor?.userName}
                />
                  {
                    errors.userName &&(
                      <span className='text-yellow-100'>
                        Please enter your first name
                      </span>
                    )
                  }
            </label>             
             
            <label className='flex flex-col gap-2 w-full'>
              <p className='text-sm text-richblack-5'>
                Email Address <sup className="text-pink-200">*</sup>
              </p>
              <input
                type="text"
                name="email"
                {...register("email",{required:true})}
                placeholder="Enter email address"
                className='w-full rounded-md py-2 px-2 bg-richblack-700 style focus:outline-0 text-richblack-5'
                defaultValue={instructor?.email}
              />
              {errors.email && <span className="text-red-500">This field is required</span>}
            </label> 
          </div>         
           
  
          <div className="flex gap-x-4 w-full">
            <label className="relative flex flex-col gap-2 w-full">
              <p className='text-sm text-richblack-5'>
                Create Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                {...register("password",{required:true})}
                placeholder="Enter new or old password"
                className='w-full rounded-md py-2 px-2 bg-richblack-700 style focus:outline-0 text-richblack-5'
              />
              {errors.password && <span className="text-red-500">This field is required</span>}
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <label className="relative flex flex-col gap-2 w-full">
              <p className='text-sm text-richblack-5'>
                Confirm Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                {...register("confirmPassword",{required:true})}
                placeholder="Confirm the new or old password"
                className='w-full rounded-md py-2 px-2 bg-richblack-700 style focus:outline-0 text-richblack-5'
              />
              {errors.confirmPassword && <span className="text-red-500">This field is required</span>}
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
          </div>

        </div>
         

        <div className="mt-8 flex gap-3">
        <button
          onClick={() => {
            navigate("/dashboard/manage_instructors");
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

export default EditDetails
