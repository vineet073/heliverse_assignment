import React, { useEffect, useState } from 'react'
import ApiConnector from '../../services/ApiConnector';
import { categories } from '../../services/Api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ViewCategoryList = ({setField, tabData}) => {
    const[allCategories,setAllCategories]=useState([]);
    const navigate=useNavigate();

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
  return (
    <div className='text-white'>
  
    {
        !allCategories ? (<div className='spinner'>
        </div>)
        : !allCategories.length ? (<div className='flex flex-col gap-5 justify-center items-center h-[60vh]'>
            <p className='text-richblack-100'>You have not created any category yet.</p>
            <button onClick={()=>setField(tabData[1].tabName)} className='border bg-yellow-25 text-richblack-900 border-richblack-100 font-semibold px-3 py-2 rounded-md'>Create Category</button>
        </div>)
        : (
            <div>
                <div className='flex bg-richblack-600 p-2 rounded-t-md text-richblack-25'>
                    <p className='max-w-[30%] min-w-[30%]'>Category Details</p>
                    <p className='max-w-[30%] min-w-[30%] text-center'>Total Courses</p>
                    <p className='max-w-[40%] min-w-[40%] text-center'>List of Courses</p>
                </div>

                {
                    allCategories.map((category,index)=> (
                        <div key={index} className='flex p-3 border-1 rounded-b-md border border-richblack-700'>
                            <div className='flex gap-5 max-w-[30%] min-w-[30%]' 
                                onClick={() => {
                                 navigate(
                                `/catalog/${category.title.toLowerCase().split(" ").join("-")}`
                                )
                                }}>
                                <div>
                                    <p className='text-md text-richblack-25'>{category.title}</p>
                                    <p className='text-sm text-richblack-100'>{category.description.substring(0,200)}</p>
                                </div>
                            </div>
                            
                            <div className='max-w-[30%] min-w-[30%] text-center'>
                                {category?.course?.length}
                            </div>

                            <div>
                            {
                                category?.course.map((item,index)=> (
                                <div key={index} className='p-3'>
                                    <div className='flex gap-5' 
                                        onClick={() => {
                                        navigate(
                                        `/courses/${item._id}`
                                        )
                                        }}>
                                        <img  src={item.thumbnail} className='rounded-lg aspect-square w-14 h-14' alt='Course'/>
                                        <div>
                                            <p className='text-md text-richblack-25'>{item.courseName}</p>
                                            <p className='text-sm text-richblack-100'>{item.courseDescription.substring(0,100)}</p>
                                        </div>
                                    </div>
    
                                </div>
                                ))
                            }
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
  
</div>
  )
}

export default ViewCategoryList
