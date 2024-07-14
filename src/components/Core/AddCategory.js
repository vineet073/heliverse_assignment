import React from 'react';
import { createCategory } from '../../services/AuthApi/CourseApi';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';


const AddCategory = () => {
  const {register,formState:{errors},handleSubmit,reset}=useForm({
    defaultValues:{
      title:"",
      description:""
    }
  });
  const {token}=useSelector((state)=>state.auth);

  const onSubmit = async (data) => {
    const {title,description}=data;
    const response = await createCategory(title,description, token);
    if (response.success) {
      reset({
        title: "", 
        description: ""
      });
    }
  };

  return (
    <div className='flex justify-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='text-richblack-5 flex flex-col gap-5 w-[50%]'>
            <div>
                <label htmlFor="category" className="text-sm text-richblack-5">Title 
                <sup className="text-pink-200">*</sup></label>
                <input
                    type="text"
                    {...register("title",{required:true})}
                    placeholder="New Category"
                    className='w-full rounded-md py-2 px-2 bg-richblack-700 style focus:outline-0 text-richblack-5'
                />
                {errors.category && <p>This field is required</p>}
            </div>
            
            <div>
                <label htmlFor="description" className="text-sm text-richblack-5">Description
                <sup className="text-pink-200">*</sup></label>
                <input
                    type="text"
                    {...register("description",{required:true})}
                    placeholder="Description"
                    className='w-full rounded-md py-2 px-2 bg-richblack-700 style focus:outline-0 text-richblack-5'
                />
                {errors.description && <p>This field is required</p>}
            </div>
            
            <button type="submit" className='w-fit border bg-yellow-25 text-richblack-900 border-richblack-100 font-semibold px-3 py-2 rounded-md'>Add Category</button>
        </form>
    </div>
   
  );
};

export default AddCategory;
