import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import {approveInstructors, getAllUnApprovedInstructorsData } from '../../services/AuthApi/ProfileApi';
import { useSelector } from 'react-redux';

const ApprovalRequests = () => {
    const[allInstructors,setAllInstructors]=useState([]);
    const {token}=useSelector((state)=>state.auth);
    const [checkedInstructors, setCheckedInstructors] = useState([]);

    const handleCheck = (id) => {
        const currentIndex = checkedInstructors.indexOf(id);
        const newChecked = [...checkedInstructors];

        if (currentIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedInstructors(newChecked);
    };

    async function fetchUnAprovedInstructors(){
        const result=await getAllUnApprovedInstructorsData(token);
        setAllInstructors(result.data.data);
    }

    async function onSubmit(){
        const result=await approveInstructors(checkedInstructors,token);
        if(result.success){
            fetchUnAprovedInstructors();
        }
    }
    useEffect( () => {
        fetchUnAprovedInstructors();
    },[] );

  return (
    <div className='text-white'>
  
    {
        !allInstructors ? (<div className='spinner'>
        </div>)
        : !allInstructors.length ? (<div className='flex flex-col gap-5 justify-center items-center h-[60vh]'>
            <p className='text-richblack-100'>There are no request for approval.</p>
        </div>)
        : (
            <div>
                <div>
                    <div className='flex bg-richblack-600 p-2 rounded-t-md text-richblack-25'>
                        <p className='max-w-[40%] min-w-[40%]'>Instructor Details</p>
                        <p className='max-w-[60%] min-w-[60%] text-center'>Resume</p>
                    </div>

                    {
                        allInstructors.map((instructor,index)=> (
                            <div key={index} className='flex p-3 border-1 rounded-b-md border border-richblack-700'>
                                <div className='flex max-w-[40%] min-w-[40%] flex-col'>
                                    <input
                                        type="checkbox"
                                        checked={checkedInstructors.includes(instructor._id)}
                                        onChange={() => handleCheck(instructor._id)}
                                    />
                                    <p className='text-lg text-richblack-25'>{instructor.firstName} {instructor.lastName}</p>
                                    <p className='text-sm text-richblack-25'>{instructor.email}</p>                                
                                </div>
                                
                                <div className='text-richblack-5'>
                                    <NavLink to={instructor.resume}>{instructor.resume}</NavLink>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div>
                    <button onClick={onSubmit} className='mt-10 border bg-yellow-25 text-richblack-900 border-richblack-100 font-semibold px-3 py-2 rounded-md'>Approve Selected</button> 
                </div>
            </div>
            
        )
    }
  
    </div>
  )
}

export default ApprovalRequests;
