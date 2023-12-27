import React from 'react'
import { useSelector } from 'react-redux';
import {FaCheck} from 'react-icons/fa';
import CourseInformationForm from './AddForm/CourseInformationForm';
import CourseBuilderForm from './AddForm/CourseBuilderForm';
import PublishCourse from './AddForm/PublishCourse';

const RenderSteps = () => {
    const {step}=useSelector((state)=>state.course);
    const steps = [
        {
            id:1,
            title: "Course Information",
        },
        {
            id:2,
            title: "Course Builder",
        },
        {
            id:3,
            title: "Publish!!!",
        },
    ];

  return (
    <div className=''>
        <div className='flex flex-col'>
            <div className='flex px-10 justify-around'>
                {steps.map((item)=>(
                    <div className='flex items-center' key={item.id}>
                        <div className={`${step===item.id?"bg-yellow-900 border-yellow-50 text-yellow-50 border" 
                        :"border-richblack-700 bg-richblack-800 text-richblack-300"} rounded-full w-10 h-10 flex items-center justify-center text-base`}
                        >
                            {
                                step>item.id ? (<FaCheck/>):(item.id)
                            }

                            
                            
                        </div>
                        
                        <div>
                            {
                                item.id<3 ?<div className={`${step!==item.id?"w-[200px]  border-dashed border border-collapse border-richblack-200":"w-[200px] border-dashed border border-collapse border-white"}`}></div>:""
                            }
                        </div>
                        
                    </div>
                ))}
            </div>

            <div className='flex gap-36 text-sm mt-2 mb-16'>
                {steps.map((item)=>(
                <div key={item.id} className={`${step===item.id?"text-richblack-5":"text-richblack-200"}`}>
                    {
                        item.title
                    }
                </div>
                ))

                }
            </div>
        </div>

       
       
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse/>}
    </div>
  )
}

export default RenderSteps
