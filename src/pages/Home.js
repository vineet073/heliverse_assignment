import React from 'react';
import {FaArrowRight} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { HighlighText } from '../components/Common/HighlighText';
import Banner from '../assets/Images/banner.mp4';
import Footer from '../components/Common/Footer';


export const Home = () => {
  return (
    <div>
        <div className='relative w-11/12 mx-auto flex flex-col items-center max-w-maxContent mb-5 mt-20 text-white justify-between'>
           <Link to={"/signup"}>
            <div className='group p-1 text-richblack-200 bg-richblack-800  rounded-full transition-all duration-200 hover:scale-95 w-fit'>
                <button className='flex items-center gap-2 font-bold transition-all duration-200 group-hover:bg-richblack-900 py-[8px] px-10 rounded-full'>
                Become An Instructor <span><FaArrowRight/></span></button>
            </div>
           </Link>

           <div className='text-white text-4xl mt-7'>
           Empower Your Future with <HighlighText text={"Coding Skills"}/>
           </div>

            <div className='w-[68%] text-md mt-3 text-center text-richblack-200 font-medium'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, 
            and get access to a wealth of resources, including hands-on projects,
             quizzes, and personalized feedback from experienced instructors.
            </div>

            
            <div className='w-[80%] h-[50%] mt-16'>        
                <video 
                muted
                loop
                autoPlay> <source src={Banner} type='video/mp4'/> </video>
            </div>
        
            
        </div>


        <Footer/>
    </div>
 )
}
