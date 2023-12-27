import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../Common/IconBtn';
import {BsChevronDown} from 'react-icons/bs';
import { useSelector } from 'react-redux';

const VideoDetailSideBar = ({setReviewModal}) => {
    const [activeStatus,setActiveStatus]=useState("");
    const[videoBarActive,setVideoBarActive]=useState("");
    const navigate=useNavigate();
    const location=useLocation();
    const{sectionID, subSectionID}=useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
      } = useSelector((state) => state.viewCourse);


    function courseValues(){
    if(courseSectionData.length==0) return;

    const currentSectionIndex=courseSectionData.findIndex(
        (data)=>data._id===sectionID
    );
    const currentSubSectionIndex=courseSectionData?.[currentSectionIndex]?.
        subSection.findIndex((data)=>data._id ===subSectionID);
    
    const activeSubSectionID=courseSectionData[currentSectionIndex]?.subSection?.
        [currentSubSectionIndex]._id;
    
    setActiveStatus(courseSectionData[currentSectionIndex]?._id);
    setVideoBarActive(activeSubSectionID);
    
    }

    useEffect(()=>{
        courseValues();
    },[courseSectionData, courseEntireData, location.pathname]);    


  return (
    <div className='text-richblack-5 w-[18vw] h-screen'>
        <div>

            <div className='flex justify-around mt-4'>
                <div onClick={()=>{
                navigate('/dashboard/enrolled-courses')
                }} className='my-2 mt-4 bg-richblack-300 w-fit rounded-full'>
                    <IoIosArrowBack size={30}/>
                </div>

                <IconBtn onClick={()=>setReviewModal(true)}
                    customClasses={"bg-yellow-50 text-lg font-semibold text-black"} text={"Add Review"}
                />
            </div>            
            
            <div>
                <p className='text-2xl uppercase font-semibold mt-4'>{courseEntireData?.courseName}</p>
                <p className='mb-4'>Completed lectures: {completedLectures?.length || 0} / {totalNoOfLectures}</p>
            </div>

        </div>

        <div>
            {
            courseSectionData?.map((section,index)=>(
                <div onClick={()=>setActiveStatus(section._id)} key={index}>
                    <div className='flex justify-between items-center mt-2'>
                        <h1 className='text-xl'>{section.sectionName}</h1>
                        <div className={`${activeStatus===section._id?
                        "rotate-0":"rotate-180"} transition-all duration-500`}>
                            <BsChevronDown/>
                        </div>
                    </div>
                    
                    {
                        activeStatus===section._id && (
                            <div className='transition-[height] duration-500 ease-in-out'>
                                {
                                    section.subSection.map((topic,i)=>(
                                        <div className={`${videoBarActive === topic._id ?
                                        "bg-yellow-50 font-semibold text-richblack-800 rounded-md":
                                        "hover:bg-richblack-900"} flex gap-3 px-5 py-2`} 
                                        key={i}
                                        onClick={()=>{
                                            navigate(`view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`) 
                                            setVideoBarActive(topic._id)
                                        }}>
                                            <input type='checkbox' checked={completedLectures?.includes(topic._id)}
                                             
                                            />
                                            <p>{topic.title}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
                
                
            ))
            }
        </div>
    </div>
  )
}

export default VideoDetailSideBar
