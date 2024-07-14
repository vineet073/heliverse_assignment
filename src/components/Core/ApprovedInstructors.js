import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAllApprovedInstructorsData } from '../../services/AuthApi/ProfileApi';
import { useSelector } from 'react-redux';

const ApprovedInstructors = () => {
    const[allInstructors,setAllInstructors]=useState([]);
    const navigate=useNavigate();
    const {token}=useSelector((state)=>state.auth);


    async function fetchAprovedInstructors(){
        const result=await getAllApprovedInstructorsData(token);
        setAllInstructors(result.data.data);
    }

    useEffect( () => {
        fetchAprovedInstructors();
    },[] );

  return (
    <div className='text-white'>
  
    {
        !allInstructors ? (<div className='spinner'>
        </div>)
        : !allInstructors.length ? (<div className='flex flex-col gap-5 justify-center items-center h-[60vh]'>
            <p className='text-richblack-100'>There are no verified instructors on the platform.</p>
        </div>)
        : (
            <div>
                <div className='flex bg-richblack-600 p-2 rounded-t-md text-richblack-25'>
                    <p className='max-w-[30%] min-w-[30%]'>Instructor Name</p>
                    <p className='max-w-[30%] min-w-[30%] text-center'>Total Courses</p>
                    <p className='max-w-[40%] min-w-[40%] text-center'>List of Courses</p>
                </div>

                {
                    allInstructors.map((instructor,index)=> (
                        <div key={index} className='flex p-3 border-1 rounded-b-md border border-richblack-700'>
                            <div className='flex gap-5 max-w-[30%] min-w-[30%]'>
                                <p className='text-md text-richblack-25'>{instructor.firstName} {instructor.lastName}</p>
                            </div>
                            
                            <div className='max-w-[30%] min-w-[30%] text-center'>
                                {instructor?.courses?.length}
                            </div>

                            <div>
                            {
                                instructor?.courses.map((item,index)=> (
                                <div key={index} className='p-3'>
                                    <div className='flex gap-5' 
                                        onClick={() => {
                                        navigate(
                                        `/courses/${item._id}`
                                        )
                                        }}>
                                        <img  src={item.thumbnail} className='w-12 rounded-lg aspect-square' alt='Course'/>
                                        <div>
                                            <p className='text-md text-richblack-25'>{item.courseName}</p>
                                            <p className='text-sm text-richblack-100'>{item.courseDescription.substring(0,50)}</p>
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

export default ApprovedInstructors
