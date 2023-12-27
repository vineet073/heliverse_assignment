import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import { createRating } from '../../../services/AuthApi/CourseApi';
import {RxCross2} from 'react-icons/rx';
import ReactStars from "react-rating-stars-component"
import IconBtn from '../../Common/IconBtn';

const CourseReviewModal = ({setReviewModal}) => {
  const {user}=useSelector((state)=>state.profile);
  const {token}=useSelector((state)=>state.auth);
  const {courseEntireData}=useSelector((state)=>state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(()=>{
    setValue("courseExperience","");
    setValue("courseRating",0);
  },[]);

  function ratingChanged(newRating){
    setValue("courseRating",newRating)
  }

  async function onSubmit(data){
    const res=await createRating({
      courseID:courseEntireData._id,
      rating:data.courseRating,
      review:data.courseExperience
    },token);

    setReviewModal(false);
  }

  return (
    <div className='inset-0 w-screen h-screen overflow-auto grid place-items-center fixed z-[1000] bg-white bg-opacity-10 backdrop-blur-sm'>
      <div className='bg-richblack-700 rounded-lg text-richblack-5 p-5'>
        <div className='flex justify-between mb-6'>
          <p className='text-lg font-semibold'>Add Review</p>
          <button onClick={()=>setReviewModal(false)} className='bg-richblack-300 rounded-full aspect-square px-2 font-semibold'><RxCross2/></button>
        </div>

        <div>
          <div>
              <img src={user?.image} className='rounded-full aspect-square' width={60} height={60}></img>

            <div className="">
                <p className="font-semibold text-richblack-5">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm text-richblack-5">Posting Publicly</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
            />

            <div className='flex flex-col mt-4'>
              <label htmlFor='courseExperience'>Add your Course Experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id='courseExperience'
                placeholder='Share your experience'
                {...register("courseExperience",{required:true})}
                className='w-[25vw] rounded-md py-2 px-2 bg-richblack-800 style focus:outline-0 text-richblack-5'
              />

              {
                errors.courseExperience && (
                  <span className=''>
                    Please Add your experience
                  </span>
                )
              }
            </div>

            <div className='mt-6 flex gap-4'>
              <button onClick={()=>setReviewModal(false)}
              className=''>
                Cancel
              </button>

              <IconBtn
                text={"Save"}
                customClasses={"bg-yellow-50 font-semibold text-richblack-900"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal
