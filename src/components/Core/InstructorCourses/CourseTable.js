import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useState } from 'react';
import FormatDate from '../../../services/FormatDate';
import {Table,Thead,Tbody,Th,Td,Tr} from 'react-super-responsive-table';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import ConfirmationModal from '../../Common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../services/AuthApi/CourseApi';


const CourseTable = ({courses,setCourses}) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const[loading,setLoading]=useState(false);
    const [confirmationModal,setConfirmationModal]=useState(null);
    const{token}=useSelector((state)=>state.auth);


    const handleDeleteCourse=async(courseID)=>{
        setLoading(true);
        await deleteCourse({courseID:courseID});
    
        const result =await fetchInstructorCourses(token);
        if(result){
          setCourses(result);
        }
    
        setConfirmationModal(null);
        setLoading(false);
    }
  console.log("All Course ", courses.createdAt)
    

  return (
    <>
        
          <Table className="rounded-xl border border-richblack-800">
            <Thead className=''>
              <Tr className='rounded-t-md border-b border-b-richblack-800 px-6 py-2'>
                <Th className='text-left px-6 py-2'>Courses</Th>
                <Th className=''>Duration</Th>
                <Th>Price</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>

            <Tbody>
              {
                courses?.length===0? (
                  <Tr>
                    <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                      No courses found
                      {/* TODO: Need to change this state */}
                    </Td>
                  </Tr>
                ):(
                  courses.map((course)=>(
                  <Tr className='border border-b border-richblack-800'>

                    <Td className='flex gap-5 px-6 my-6'>
                        <div className='rounded-lg'>
                        <img className='w-60 rounded-lg object-cover h-44'
                            src={course?.thumbnail}
                            alt={course?.courseName}
                        />
                        </div>
                      
                      <div className='mt-4'>
                        <p className='text-lg font-semibold'>{course.courseName}</p>
                        <p className='text-xs text-richblack-200 mt-5'>
                          {course.courseDescription.split(" ").length >30?
                          course.courseDescription.split(" ").splice(0,30).join(" ")+"..."
                          :course.courseDescription}
                        </p>
                        <p className='text-xs mt-4'>
                          Created:{FormatDate(course.createdAt)}
                        </p>
                        {course.status === "Draft" ? (
                        <p className="flex mt-4 w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                          <HiClock size={14} />
                          Drafted
                        </p>
                        ) 
                        : (
                          <div className="flex mt-4 w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                              <FaCheck size={8} />
                            </div>
                            Published
                          </div>
                        )}
                      </div>
                    </Td>

                    <Td className="text-sm font-medium text-richblack-100 pl-10">
                  2hr 30min
                    </Td>

                    <Td className="text-sm font-medium text-richblack-100">
                      ₹{course.price}
                    </Td>

                    <Td className="text-sm font-medium text-richblack-100 ">
                      <button
                        disabled={loading}
                        onClick={() => {
                          navigate(`/dashboard/edit-course/${course._id}`)
                        }}
                        title="Edit"
                        className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                      >
                        <FiEdit2 size={20} />
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => {
                          setConfirmationModal({
                            text1: "Do you want to delete this course?",
                            text2:
                              "All the data related to this course will be deleted",
                            btn1text: !loading ? "Delete" : "Loading...  ",
                            btn2text: "Cancel",
                            btn1handler: !loading
                              ? () => handleDeleteCourse(course._id)
                              : () => {},
                            btn2handler: !loading
                              ? () => setConfirmationModal(null)
                              : () => {},
                          })
                        }}
                        title="Delete"
                        className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                      >
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </Td>
                    
                  </Tr>
                  ))
                )
              }
            </Tbody>
          </Table>
        
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
      </>
  )
}

export default CourseTable
