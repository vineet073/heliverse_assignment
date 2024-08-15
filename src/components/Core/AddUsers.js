import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import ApiConnector from '../../services/ApiConnector';
import { categories } from '../../services/Api';
import { signUp } from '../../services/AuthApi/AuthApi';

function AddUsers() {
  
    const {register,reset,
      handleSubmit,
      formState:{errors},} = useForm({
      defaultValues:{
      userName:"",
      email: "",
      password: "",
      confirmPassword: "",
      accountType:"Instructor",
      classroom:"",        
      }
    })

    const[allCategories,setAllCategories]=useState([]);


    async function fetchAllCategories(){
        try {
            const result=await ApiConnector("GET",categories.CATEGORIES_API);
            setAllCategories(result.data.allCategorys);
        } catch (error) {
            toast.error("Could not fetch categories...");
        }
    }

    useEffect( () => {
        fetchAllCategories();
    },[] )
  
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
    const handleOnSubmit = async (data) => {
      const {userName,email,password,confirmPassword,accountType,classroom}=data;
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords Do Not Match")
        return;
      }
      
      const response = await signUp(userName,email,password,confirmPassword,accountType,classroom);
      if (response) {
        reset({
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            accountType:"Instructor",
            classroom:"",
        })
      }
  
    }
  
    return (
      <div className='flex justify-center'>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col gap-y-4 w-[50%]">
          <div className="flex gap-x-4">  
            <label className='w-full'>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                User Name <sup className="text-pink-200">*</sup>
              </p>
              <input
                type="text"
                name="userName"
                {...register("userName",{required:true})}
                placeholder="Enter user name"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
              {errors.userName && <span className="text-red-500">This field is required</span>}
            </label>
          </div>
  
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="email"
              {...register("email",{required:true})}
              placeholder="Enter email address"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            {errors.email && <span className="text-red-500">This field is required</span>}
          </label>
  
          <div className="flex gap-x-4">
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Create Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                {...register("password",{required:true})}
                placeholder="Enter Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
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
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                {...register("confirmPassword",{required:true})}
                placeholder="Confirm Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
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

          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Account Type <sup className="text-pink-200">*</sup>
            </p>
            <select
              name="accountType"
              {...register("accountType",{required:true})}
              defaultValue={"Choose AccountType"}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5">
            
              <option value="" disabled>Choose account type</option>
              <option value="Instructor" >Instructor</option>
              <option value="Student">Student</option>
              
            </select>
          </label>

          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Assign Classroom <sup className="text-pink-200">*</sup>
            </p>
            <select
              name="classroom"
              {...register("classroom",{required:true})}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5">
            
            <option value="" disabled>Choose a classroom</option>
              {
                allCategories.map((item,index)=>(
                    <option key={index} className='text-richblack-200' value={item?._id}>
                        {item?.title}
                    </option>
                ))
              }

            </select>
            {errors.classroom && <span className="text-red-500">This field is required</span>}
          </label>


          <button
            type="submit"
            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
            Create Account
          </button>
        </form>
      </div>
    )
  }

export default AddUsers;
