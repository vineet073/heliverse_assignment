import React, { useEffect, useState } from 'react'
import ApiConnector from '../../services/ApiConnector';
import { categories } from '../../services/Api';
import toast from 'react-hot-toast';

const ClassroomList = ({setField, tabData}) => {
    const[allCategories,setAllCategories]=useState([]);


    async function fetchAllCategories(){
        try {
            const result=await ApiConnector("GET",categories.CATEGORIES_API);
            setAllCategories(result.data.allCategorys);
        } catch (error) {
            toast.error("Could not fetch classroom...");
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
            <p className='text-richblack-100'>You have not created any classroom yet.</p>
            <button onClick={()=>setField(tabData[1].tabName)} className='border bg-yellow-25 text-richblack-900 border-richblack-100 font-semibold px-3 py-2 rounded-md'>Create Classroom</button>
        </div>)
        : (
            <div>
                <div className='flex bg-richblack-600 p-2 rounded-t-md text-richblack-25'>
                    <p className='max-w-[30%] min-w-[30%]'>Classroom Name</p>
                    <p className='max-w-[30%] min-w-[30%] text-center'>Total Courses</p>
                    <p className='max-w-[40%] min-w-[40%] text-center'>List of Courses</p>
                </div>

                {
                    allCategories.map((category,index)=> (
                        <div key={index} className='flex p-3 border-1 rounded-b-md border border-richblack-700'>
                            <div className='flex gap-5 max-w-[30%] min-w-[30%] items-center p-2'>
                                <p className='text-md text-richblack-25'>{category.title}</p>
                            </div>
                            
                            <div className='p-2 flex gap-5 max-w-[30%] min-w-[30%] text-md text-richblack-25 justify-center items-center'>
                                {category.startTime}-{category.endTime}
                            </div>

                            <div className='flex gap-x-5 max-w-[30%] min-w-[30%] flex-wrap p-2'>
                            {
                                category?.days.map((item,index)=> (
                                <div key={index}>                                       
                                    <p className='text-md text-richblack-25'>{item}</p>                                          
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

export default ClassroomList
