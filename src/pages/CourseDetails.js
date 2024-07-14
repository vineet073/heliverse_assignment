import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/AuthApi/CourseApi';
import AvgRating from '../services/AvgRating';
import RatingStars from '../components/Common/RatingStars';
import FormatDate from '../services/FormatDate';
import CourseDetailCard from '../components/Core/CourseDetailCard';
import ConfirmationModal from '../components/Common/ConfirmationModal';
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";
import { buyCourse } from '../services/AuthApi/Payment';

const CourseDetails = () => {
  const{token}=useSelector((state)=>state.auth);
  const{user}=useSelector((state)=>state.profile);
  const{loading}=useSelector((state)=>state.profile);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const{courseID}=useParams();
  const[confirmationModal,setConfirmationModal]=useState(null);
  const[courseData,setCourseData]=useState(null);
  const [activeStatus,setActiveStatus]=useState("");

  const getCourseFullDetails = async() => {
 
    try{
      const  result = await fetchCourseDetails(courseID);
      setCourseData(result);
      setActiveStatus(courseData?.courseContent[0]._id);
    }
    catch(error) {
      throw new Error("Could not fetch course details");
    }
  }

  useEffect(()=> {      
      getCourseFullDetails();  
  }, [courseID]);

  const[avgReviewCount,setAvgReviewCount]=useState(0);
  useEffect(()=>{
      const count=AvgRating(ratingAndReviews);
      setAvgReviewCount(count);
  },[courseData]);
  

  const[totalNoOfLectures,setTotalNoOfLectures]=useState(0);
  const[totalDuration,setTotalDuration]=useState(0);
  useEffect(()=>{ 
    let lectures=0;
    let duration=0;
    courseContent?.forEach((sec) => {
      lectures+=sec.subSection.length || 0;
      sec.subSection.forEach((subSec)=>{
        duration+=subSec.timeDuration || 0;
      })
    });

    setTotalNoOfLectures(lectures);
    setTotalDuration(duration);
  },[courseID]);


  function handleBuyCourse(){
    if(token){
      buyCourse(token,[courseID],user,dispatch,navigate);
      return;
    }

    setConfirmationModal({
      text1:"you are not Logged in",
      text2:"Please login to purchase the course",
      btn1text:"Login",
      btn2text:"Cancel",
      btn1handler:() => navigate("/login"),
      btn2handler:()=>setConfirmationModal(null),
    })
  }

  if(loading || !courseData) {
    return (
        <div className='text-white'>
            Loading...
        </div>
    )
  }     
    var {
      _id: course_id, 
      courseName,
      courseDescription,
      thumbnail,
      price,
      whatYouWillLearn,
      courseContent,
      ratingAndReviews,
      instructor,
      studentsEnrolled,
      createdAt,
    } = courseData;

  
  if(courseData?.success===false){
    return(
      <div className='text-white'>
        Course Not Found
      </div>
    )
  } 
   
  return (
    <div className='text-white'>

        <div className='bg-richblack-800 relative pl-36 mb-14 pt-20 pb-20'>
          <h1 className='text-3xl font-semibold'>{courseName}</h1>
          <h3 className='my-3 text-richblack-300 w-[60%]'>{courseDescription}</h3>

          <div className='flex gap-1 my-3 text-lg items-center'>
            <p>{avgReviewCount}</p>
            <RatingStars avgReviewCount={avgReviewCount} Star_Size={22}/>
            <p >({ratingAndReviews?.length} reviews)</p>
            <p>{studentsEnrolled?.length} students enrolled</p>
          </div>

          {/* <p  className='text-xl my-3'>Created By {instructor?.firstName} {instructor?.lastName}</p> */}

          <div className='flex gap-4'>
            <p className='flex items-center gap-1'><IoIosInformationCircleOutline/>Created At {FormatDate(createdAt)} </p>
            <p className='flex items-center gap-1'> <CiGlobe/>English</p>
          </div>

          <CourseDetailCard course={courseData} setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}
          />
        </div>

        <div className='ml-36 p-7 border border-richblack-500 w-[56vw]'>
          <h1 className='text-3xl font-semibold'>What you'll learn</h1>
          <p className='my-3'>{whatYouWillLearn}</p>
        </div>

        <div className='ml-36 w-[56vw]'>
          <h1 className='text-2xl font-semibold mt-9 mb-4'>Course Content:</h1>

          <div className='flex flex-col gap-x-3 justify-between'>
            <div className='flex gap-x-3 justify-between'>
              <div className='flex gap-2'>
                <span>{courseContent?.length} section(s)</span>

                <span>
                    {totalNoOfLectures} lectures
                </span>
                <span>
                    {totalDuration?.toFixed(1)} total length
                </span>
              </div>

              <div>
                  <button
                      >
                      Collapse all Sections
                  </button>
              </div>
            </div>


            <div className='bg-richblack-700 rounded-md mb-10'>
              {
                courseContent?.map((sec,index)=>(
                  <div key={index} className='mb-2'
                  onClick={()=>setActiveStatus(sec._id)}>
                    <p className='px-2'>{sec.sectionName}</p>

                  {
                    activeStatus === sec._id && (
                      <div className='transition-[height] duration-500 ease-in-out bg-richblack-300'>
                        {
                          sec.subSection?.map((subSec,index)=>(
                            <div key={index} className='pl-6'>{subSec.title}</div>
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

      
        </div> 


      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}

    </div>
    
  )
}

export default CourseDetails;
