import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../services/AuthApi/CourseApi';
import { setCourse } from '../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import Upload from './Upload'
import IconBtn from '../../../Common/IconBtn';
import {RxCross2} from 'react-icons/rx';

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
  }) => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues,
    } = useForm();

    const {course} =useSelector((state)=>state.course);
    const {token} =useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        if(view||edit){
            setValue("lectureTitle",modalData.title);
            setValue("lectureDesc",modalData.description);
            setValue("lectureVideo",modalData.video)
        }
    },[]);

    const isFormUpdated=()=>{
        const currentValues=getValues();
        if (
          currentValues.lectureTitle !== modalData.title || 
          currentValues.lectureDesc !== modalData.description || 
          currentValues.lectureVideo !== modalData.video             
        ) {
          return true;
        }
        return false;
    }

    async function handleEditSectionName(){
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("sectionID", modalData.sectionID);
        formData.append("subSectionID",modalData._id);
        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle)
        }
        if (currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc)
        }
        if (currentValues.lectureVideo !== modalData.video) {
            formData.append("video",currentValues.lectureVideo)
        }
        
        const result=await updateSubSection(formData,token);
        console.log(result);

        if(result){
            const updatedCourseContent = course.courseContent.map((section)=>
            section._id===modalData? result : section);

            const updatedCourse = {...course,courseContent:updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);         
    }

    async function onSubmit(data){
        if(view) return;
        if(edit){
            if(isFormUpdated()){
                handleEditSectionName();
            }
            else{
                toast.error("No changes were made");
            }
            return
        }

        const formData = new FormData();
        formData.append("sectionID", modalData)
        formData.append("title",data.lectureTitle)
        formData.append("description", data.lectureDesc)
        formData.append("video", data.lectureVideo);
        console.log(formData);
        setLoading(true);

        const result=await createSubSection(formData,token);

        if(result){
            const updatedCourseContent=course.courseContent.map((section)=>
            section._id === modalData? result : section);

            const updatedCourse={...course,courseContent:updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);      
    }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen 
    place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
            <div className='flex justify-between bg-richblack-700 p-5'>
                <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                <button onClick={() => setModalData(null)}>
                    <RxCross2 className="text-2xl text-richblack-5" />
                </button>
            </div>

      
            <form onSubmit={handleSubmit(onSubmit)} className='p-7'>
                <div className='bg-richblack-800 mt-2'>
                <Upload
                    name="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.video : null}
                    editData={edit ? modalData.video : null}
                />

                <div className='flex flex-col gap-2 mt-3'>
                    <label className='text-sm text-richblack-5' htmlFor='lectureTitle'>Lecture Title
                    {!view && <sup className="text-pink-200">*</sup>}</label>
                    <input
                    name='lectureTitle'
                    id='lectureTitle'
                    type='text'
                    className='w-full rounded-md py-2 px-2 bg-richblack-700 style focus:outline-0 text-richblack-5'
                    placeholder='Enter Lecture Title'
                    {...register("lectureTitle",{required:true})}
                    //   defaultValue={user?.courseTitle}
                    />
                    {
                    errors.lectureTitle &&(
                        <span className='text-yellow-100'>
                        Please enter lecture title
                        </span>
                    )
                    }                
                </div>

                <div className='flex flex-col gap-2 mt-5'>
                    <label className='text-sm text-richblack-5' htmlFor='lectureDesc'>Lecture Description
                    {!view && <sup className="text-pink-200">*</sup>}</label>
                    <input
                    name='lectureDesc'
                    id='lectureDesc'
                    type='text'
                    className='w-full rounded-md py-2 px-2 bg-richblack-700 style focus:outline-0 text-richblack-5'
                    placeholder='Enter Lecture Description'
                    {...register("lectureDesc",{required:true})}
                    //   defaultValue={user?.courseTitle}
                    />
                    {
                    errors.lectureDesc &&(
                        <span className='text-yellow-100'>
                        Please enter lecture description
                        </span>
                    )
                    }                
                </div>
                </div>
            
                

                {!view && (
                <div className="flex justify-end">
                <IconBtn
                    type='submit'            
                    disabled={loading}
                    text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
                    customClasses={'bg-yellow-100 text-richblack-900 font-semibold mt-5'}
                />
                </div>
                )}
            </form>
        </div>
      
  
    </div>
  )
}

export default SubSectionModal
