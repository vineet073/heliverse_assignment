import React from 'react';
import {createClassroom} from '../../services/AuthApi/ClassroomApi';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Tags from './Tags';



const AddClassroom = () => {
  const {register,formState:{errors},handleSubmit,reset,setValue,getValues}=useForm({
    defaultValues:{
      title:"",
      startTime:"",
      endTime:"",
      days:[],
    }
  });
  const {token}=useSelector((state)=>state.auth);

  const onSubmit = async (data) => {
    const {title,startTime,endTime,days}=data;
    console.log("data",data);
    const response = await createClassroom(title,days,startTime,endTime,token);
    if (response.success) {
      reset({
        title: "", 
        endTime: "",
        startTime: "",
        days: [],
      });
    }
  };

  return (
    <div className='flex justify-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='text-richblack-5 flex flex-col gap-5 w-[50%]'>
            <div>
                <label htmlFor="title" className="text-sm text-richblack-5">Classroom Name 
                <sup className="text-pink-200">*</sup></label>
                <input
                    type="text"
                    {...register("title",{required:true})}
                    placeholder="New Classroom"
                    className='w-full rounded-md py-2 px-2 bg-richblack-700 style focus:outline-0 text-richblack-5'
                />
                {errors.title && <p>This field is required</p>}
            </div>
            
            <Tags
              label="Days"
              name="days"
              placeholder="Enter Days and press Enter"
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
            />

            <div>
                <label htmlFor="startTime" className="text-sm text-richblack-5">Start Time
                <sup className="text-pink-200">*</sup></label>
                <input
                    type="text"
                    {...register("startTime",{required:true})}
                    placeholder="Start Time"
                    className='w-full rounded-md py-2 px-2 bg-richblack-700 style focus:outline-0 text-richblack-5'
                />
                {errors.startTime && <p>This field is required</p>}
            </div>
            <div>
                <label htmlFor="endTime" className="text-sm text-richblack-5">End Time
                <sup className="text-pink-200">*</sup></label>
                <input
                    type="text"
                    {...register("endTime",{required:true})}
                    placeholder="End Time"
                    className='w-full rounded-md py-2 px-2 bg-richblack-700 style focus:outline-0 text-richblack-5'
                />
                {errors.endTime && <p>This field is required</p>}
            </div>

            <button type="submit" className='w-fit border bg-yellow-25 text-richblack-900 border-richblack-100 font-semibold px-3 py-2 rounded-md'>Add Classroom</button>
        </form>
    </div>
   
  );
};

export default AddClassroom;
