import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../services/AuthApi/CourseApi';
import {VscAdd} from 'react-icons/vsc';
import CourseTable from './CourseTable';


const InstructorCourses = () => {
  const navigate=useNavigate();
  const{token}=useSelector((state)=>state.auth);
  const[courses,setCourses]=useState([]);

  useEffect(()=>{
    const fetchCourses=async ()=>{
      const result =await fetchInstructorCourses(token);
      if(result){
        setCourses(result)
      }
    }
    
    fetchCourses();
  },[]);
  
  
  return (
    <div className='text-white'>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <button
          className={`px-5 py-2 font-semibold text-center rounded-md transition-all duration-200 hover:scale-95
       bg-yellow-50 text-black hover:shadow-sm hover:shadow-brown-25 flex gap-1 items-center`}
          onClick={() => navigate("/dashboard/add-course")}
        >
          Add Course
          <VscAdd />
        </button>
      </div>
      {courses && <CourseTable courses={courses} setCourses={setCourses}/>}
    </div>
  )
}

export default InstructorCourses
