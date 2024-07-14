import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/AuthApi/CourseApi';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import ReactPlayer from 'react-player';
import IconBtn from '../../Common/IconBtn';
import { FaCirclePlay } from "react-icons/fa6";
import ChatBot from '../Chatbot/Chatbot';
import { IoChatbubblesSharp } from "react-icons/io5";


const VideoDetails = () => {
  const{courseID,sectionID,subSectionID}=useParams();
  const navigate=useNavigate();
  const location=useLocation();
  const playerRef=useRef(null);
  const dispatch=useDispatch();
  const {token}=useSelector((state)=>state.auth);
  const{courseSectionData, courseEntireData, completedLectures}=useSelector((state)=>state.viewCourse);

  const[videoData,setVideoData]=useState([]);
  const [previewSource,setPreviewSource]=useState("");
  const [videoEnded,setVideoEnded]=useState(false);
  const [loading,setLoading]=useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showChat, setShowChat] = useState(false);

  function handleFullScreenChange(){
    const isPlayerFullScreen = document.fullscreenElement === playerRef.current.wrapper;
    setIsFullScreen(isPlayerFullScreen);
  }

  function videoDetails(){
    if(!courseSectionData.length) return;
    if(!courseID || !sectionID || !subSectionID){
      navigate(`/dashboard/enrolled-courses`);
    }else{
      const filterData=courseSectionData.filter(
        (section)=>section._id === sectionID
      );

      const filterVideoData=filterData?.[0]?.subSection.filter(
        (subSec)=>subSec._id === subSectionID
      );

      setVideoData(filterVideoData[0]);
      setPreviewSource(courseEntireData?.thumbnail);
      setVideoEnded(false);
    }
  }

  useEffect(()=>{
    videoDetails();
  },[courseSectionData,courseEntireData,location.pathname]);

  useEffect(()=>{
    document.addEventListener('fullscreenchange',handleFullScreenChange);

    return ()=>{
      document.removeEventListener('fullscreenchange',handleFullScreenChange);
    }
  },[]);

  function isFirstVideo(){
    const sectionIndex=courseSectionData.findIndex((data)=>
    data._id === sectionID);

    const subSectionIndex=courseSectionData[sectionIndex]?.subSection.findIndex(
      (data)=>data._id === subSectionID
    );

    if(sectionIndex ===0 && subSectionIndex ===0 ){
      return true;
    }else{
      return false;
    }
  }

  function isLastVideo(){
    const sectionIndex=courseSectionData.findIndex((data)=>
    data._id === sectionID);

    const subSectionIndex=courseSectionData[sectionIndex]?.subSection.findIndex(
      (data)=>data._id === subSectionID
    );

    if(sectionIndex ===courseSectionData.length -1 &&
       subSectionIndex ===courseSectionData[sectionIndex].subSection.length-1 ){
      return true;
    }else{
      return false;
    }
  }

  function goToNext(){
    const sectionIndex=courseSectionData.findIndex((data)=>
    data._id === sectionID);

    const subSectionIndex=courseSectionData[sectionIndex]?.subSection.findIndex(
      (data)=>data._id === subSectionID
    );

    const noOfSubsections =
    courseSectionData[sectionIndex].subSection.length;

    if(subSectionIndex !== noOfSubsections-1){
      const nextSubSectionID=courseSectionData[sectionIndex]?.subSection[subSectionIndex + 1]._id;
      navigate(
        `/view-course/${courseID}/section/${sectionID}/sub-section/${nextSubSectionID}`
      );
    }else{
      const nextSectionID=courseSectionData[sectionIndex + 1]?._id;
      const nextSubSectionID=courseSectionData[sectionIndex + 1]?.subSection[0]._id;
      navigate(
        `/view-course/${courseID}/section/${nextSectionID}/sub-section/${nextSubSectionID}`
      );
    }
  }

  function goToPrev(){
    const sectionIndex=courseSectionData.findIndex((data)=>
    data._id === sectionID);

    const subSectionIndex=courseSectionData[sectionIndex]?.subSection.findIndex(
      (data)=>data._id === subSectionID
    );

    if(subSectionIndex !== 0){
      const nextSubSectionID=courseSectionData[sectionIndex]?.subSection[subSectionIndex-1]._id;
      navigate(
        `/view-course/${courseID}/section/${sectionID}/sub-section/${nextSubSectionID}`
      );
    }else{
      const nextSectionID=courseSectionData[sectionIndex-1]._id;
      const noOfSubsections =
      courseSectionData[sectionIndex-1].subSection.length;
      const nextSubSectionID=courseSectionData[sectionIndex-1]?.subSection[noOfSubsections-1]._id;
      navigate(
        `/view-course/${courseID}/section/${nextSectionID}/sub-section/${nextSubSectionID}`
      );
    }
  }

  async function handleLectureCompletion(){
    setLoading(true);
    const res=await markLectureAsComplete(
      {courseID:courseID,subSectionID:subSectionID},token
    )

    if(res){
      dispatch(updateCompletedLectures(subSectionID))
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-5 text-white">
      {
        !videoData ? (
          <div>
            <img
              src={previewSource}
              alt='preview'
            />
          </div>
        ):(
          <div className='relative'>
            <ReactPlayer
              ref={playerRef}
              onEnded={()=>setVideoEnded(true)}
              url={videoData?.video}
              aspectRatio='16:9'
              controls
              playIcon={<FaCirclePlay />}
              width={'78vw'}
              height={'80vh'}/>  
            
            {!isFullScreen && (
              <button onClick={(e) => {
                e.stopPropagation();
                setShowChat(!showChat)
                }} className='absolute right-14 bottom-20 z-[11] group'>
                {showChat ? <ChatBot setShowChat={setShowChat} showChat={showChat}/> :
                 <div className='bg-white p-[0.45rem] rounded-full'>
                  <IoChatbubblesSharp className='text-richblack-900 transition-all duration-200 group-hover:text-yellow-200' fontSize={30}/>
                 </div>}
              </button>
            )}

            {videoEnded && (
            <div style={{
              backgroundImage:
                "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="absolute inset-0 z-[10] grid h-full place-content-center font-inter">
              {
                !completedLectures?.includes(subSectionID) && (
                  <IconBtn
                    disabled={loading}
                    onClick={()=>handleLectureCompletion()}
                    text={!loading ? "Mark lecture as completed":"Loading..."}
                    customClasses="text-xl max-w-max px-4 mx-auto bg-yellow-50 text-black"
                  />
                )
              }

              <IconBtn
                disabled={loading}
                onClick={()=>{
                  if(playerRef?.current){
                    playerRef?.current.seekTo(0)
                    setVideoEnded(false)
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2 bg-richblack-300"
              />

              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={()=>goToPrev()}
                    className="blackButton">
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={()=>goToNext()}
                    className="blackButton">
                    Next
                  </button>
                )}
              </div>
            </div>
            )} 
          </div>
               
        )
      }

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-1 pb-6">{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails
