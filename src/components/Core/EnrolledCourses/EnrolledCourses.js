import React from 'react';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProgressBar from '@ramonak/react-progress-bar';
import { getUserEnrolledCourses } from "../../../services/AuthApi/ProfileApi";
import { useNavigate } from 'react-router-dom';


export default function EnrolledCourses() {

  const {token}  = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const navigate=useNavigate();


  async function getEnrolledCourses(){
      try{

          const response = await getUserEnrolledCourses(token);
          setEnrolledCourses(response);
      }
      catch(error) {
          console.log("Unable to Fetch Enrolled Courses");
      }
  }

  useEffect(()=> {
      getEnrolledCourses();
  },[]);

return (
    <div className='text-white'>
  
        <div className='text-3xl mb-10'>Enrolled Courses</div>
        {
            !enrolledCourses ? (<div>
                Loading...
            </div>)
            : !enrolledCourses.length ? (<p>You have not enrolled in any course yet</p>)
            : (
                <div>
                    <div className='flex bg-richblack-600 justify-between p-2 rounded-t-md text-richblack-25'>
                        <p className='w-64'>Course Name</p>
                        <p className='w-52'>Durations</p>
                        <p className='w-52'>Progress</p>
                    </div>

                    {
                        enrolledCourses.map((course,index)=> (
                            <div key={index} className='flex justify-between p-3 border-1 rounded-b-md border border-richblack-700'>
                                <div className='flex gap-5' 
                                    onClick={() => {
                                     navigate(
                                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                    )
                                    }}>
                                    <img  src={course.thumbnail} className='w-12 rounded-lg aspect-square'/>
                                    <div>
                                        <p className='text-md text-richblack-25'>{course.courseName}</p>
                                        <p className='text-sm text-richblack-100'>{course.courseDescription.substring(0,30)}</p>
                                    </div>
                                </div>
  
                                <div>
                                    {course?.totalDuration || '2hr 30 mins'}
                                </div>
  
                                <div className='w-52'>
                                    <p>Progress: {course?.progressPercentage}%</p>
                                    <ProgressBar
                                        completed={course?.progressPercentage}
                                        height='8px'
                                        isLabelVisible={false}
                                        />
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
