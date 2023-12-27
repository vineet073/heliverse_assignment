import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getInstructorDashboard } from '../../../services/AuthApi/ProfileApi';
import { fetchInstructorCourses } from '../../../services/AuthApi/CourseApi';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

const Instructor = () => {
  const{token}=useSelector((state)=>state.auth);
  const{user}=useSelector((state)=>state.profile);
  const[loading,setLoading]=useState(false);
  const[instructorData, setInstructorData]=useState(null);
  const[courses,setCourses]=useState([]);

  async function getData(){
    setLoading(true);
    const instructorData=await getInstructorDashboard(token);
    const result=await fetchInstructorCourses(token);
    if(instructorData.length){
      setInstructorData(instructorData);
    }

    if(result){
      setCourses(result);
    }

    setLoading(false);
  }

  useEffect(()=>{
    getData();
  },[]);

  const totalAmount=instructorData?.reduce((acc,curr)=>
  acc+curr.totalAmountGenerated,0);

  const totalStudents=instructorData?.reduce((acc,curr)=>
  acc+curr.totalStudentsEnrolled,0);


  return (
    <div>
      <div>
        <h1>Hi {user?.firstName}</h1>
        <p>Let's start something new</p>
      </div>

      {
        loading?(
          <div className='spinner'></div>
        ):(
          courses.length >0 ?
          <div>
            <div className='flex space-x-4'>
              {
                totalAmount>0 && totalStudents>0 ? (
                  <div className='w-[40vw]'>
                    <InstructorChart courses={instructorData}/>
                  </div>
                ):(
                  <div>Not Enough Data to Visualize</div>
                )
              }

              <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
                <p className="text-lg font-bold text-richblack-5">Statistics</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-lg text-richblack-200">Total Courses</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      {courses.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-richblack-200">Total Students</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      {totalStudents}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-richblack-200">Total Income</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      Rs. {totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div>
                <p>Your courses</p>
                <Link to={'/dashboard/my-courses'}>
                  <p>View All</p>
                </Link>
              </div>

              <div className='flex gap-4'>
              {
                courses.slice(0,3).map((course)=>{
                  return(
                    <div key={course._id} className="w-1/3">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-[201px] w-full rounded-md object-cover"
                  />
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-richblack-50">
                      {course.courseName}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-xs font-medium text-richblack-300">
                        {course?.studentsEnroled?.length} students
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        |
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        Rs. {course.price}
                      </p>
                    </div>
                  </div>
                </div>
                  )
                })
              }
              </div>                                                       
            </div>
          </div>
          :
          <div>
            <p>
              You have not created any course yet
            </p>

            <Link to={'/dashboard/add-course'}>
              <p>Create a course</p>
            </Link>
          </div>
        )
      }
    </div>
  )
}

export default Instructor
