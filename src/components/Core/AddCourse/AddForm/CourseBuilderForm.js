import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { createSection, updateSection } from '../../../../services/AuthApi/CourseApi';
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import IconBtn from '../../../Common/IconBtn';
import {IoAddCircleOutline} from 'react-icons/io5'
import NestedView from './NestedView';
import {MdNavigateNext} from 'react-icons/md'


const CourseBuilderForm = () => {
  const{
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors},
  }=useForm();

  const {course}=useSelector((state)=>state.course);
  const {token}=useSelector((state)=>state.auth);
  const [loading,setLoading]=useState(false);
  const[editSectionID,setEditSectionID]=useState(null);
  const dispatch=useDispatch();

  async function onSubmit(data){
    setLoading(true);
    let result;

    if(editSectionID){
      result=await updateSection({
        sectionName:data.sectionName,
        sectionID:editSectionID,
        courseID:course._id
      },token)
    }

    else{
      result=await createSection({
        sectionName:data.sectionName,
        courseID:course._id
      },token)
    }

    if(result){
      dispatch(setCourse(result));
      setEditSectionID(null);
      setValue("sectionName","");
    }
    setLoading(false);
  }

  function cancelEdit(){
    setEditSectionID(null);
    setValue("sectionName","");
  }

  function handleEditSectionName(sectionID,sectionName){
    if(editSectionID===sectionID){
      cancelEdit();
      return;
    }

    setEditSectionID(sectionID);
    setValue("sectionName",sectionName);
  }

  function goBack(){
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  function goToNext() {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section")
      return
    }
    dispatch(setStep(3))
  }

  return (
    <div className='bg-richblack-800 rounded-md p-8 border border-richblack-700 text-richblack-5'>
      <p className='text-2xl font-medium mb-9'>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2'>
              <label className='text-sm text-richblack-5' htmlFor='sectionName'>
                Section<sup className='text-pink-400 text-base'>*</sup></label>
              <input
              name='sectionName'
              id='sectionName'
              type='text'
              className='w-full rounded-md py-2 px-2 bg-richblack-700 style focus:outline-0 text-richblack-5'
              placeholder='Add a section to build your course'
              {...register("sectionName",{required:true})}
            //   defaultValue={user?.courseTitle}
              />
                {
                  errors.sectionName &&(
                    <span className='text-yellow-100'>
                      Please enter section title
                    </span>
                  )
                }
             
        </div>

        <div className='mt-5'>
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionID ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={'border-1 border border-yellow-50 flex gap-2 text-yellow-100 text-base font-semibold'}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50 font-semibold" />
          </IconBtn>
          {
            editSectionID && (
            <button onClick={cancelEdit} type='button'>Cancel edit</button>
            )
          }
        </div>
      </form>

      {
        course.courseContent.length>0 && (
          <NestedView handleEditSectionName={handleEditSectionName}/>
        )
      }

      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300
          py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>

        <button className='bg-yellow-50 text-black hover:shadow-sm hover:shadow-brown-25 
        px-5 py-2 text-center rounded-md transition-all duration-200 hover:scale-95 flex items-center font-semibold'
        onClick={goToNext}>
          Next
          <MdNavigateNext />
        </button>
        
      </div>
    </div>
  )
}

export default CourseBuilderForm
