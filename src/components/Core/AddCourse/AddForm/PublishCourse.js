import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetCourse, setStep } from '../../../../slices/courseSlice';
import { editCourseDetails } from '../../../../services/AuthApi/CourseApi';
import toast from 'react-hot-toast';
import {MdNavigateNext} from 'react-icons/md';

const PublishCourse = () => {
  const{register,setValue,getValues,handleSubmit,formState:{errors}}=useForm();

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {token}=useSelector((state)=>state.auth);
  const {course}=useSelector((state)=>state.course);
  const[loading,setLoading]=useState(false);

  useEffect(()=>{
    if(course?.status==='Published'){
      setValue("public",true);
    }
  },[]);

  const goBack = () => {
    dispatch(setStep(2))
  }

  function goToCourses(){
    dispatch(resetCourse());
    navigate("/dashboard/my-courses");
  }

  async function handlePublishCourse(){
    if((course?.status==='Published' && getValues("public")===true)|| 
    (course?.status==='Draft' && getValues("public")===false)){
      goToCourses();
      return;
    }

    const formData=new FormData();
    formData.append("courseID",course._id);
    const courseStatus=getValues("public")?
      "Published":"Draft";
    formData.append("status",courseStatus);
    setLoading(true);

    const result=await editCourseDetails(formData,token);
    if(result){
      goToCourses();
    }
    else{
      toast.error("Something went wrong");
    }
    setLoading(false);    
  }

  return (
    <div className='bg-richblack-800 border border-richblack-600 rounded-lg p-5'>
      <div className='text-2xl font-semibold mb-7'>Publish Settings</div>
      <form onSubmit={handleSubmit(handlePublishCourse)}>
        <div className='flex gap-2'>
          <input
          name='public'
          id='public'
          type='checkbox'
          {...register("public")}
          /> 
          <label className='text-richblack-200 text-lg' htmlFor='public'>Make this course as public</label>                             
        </div>

        <div className="flex justify-end gap-x-3 mt-7">
          <button
            onClick={goBack}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300
            py-[8px] px-[20px] font-semibold text-richblack-900`}>
            Back
          </button>

          <button className='bg-yellow-50 text-black hover:shadow-sm hover:shadow-brown-25 px-5 py-2 
          text-center rounded-md transition-all duration-200 hover:scale-95 flex items-center font-semibold'>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default PublishCourse
