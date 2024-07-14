import React from 'react';
import {FaArrowRight} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { HighlighText } from '../components/Common/HighlighText';
import { CTAButton } from '../components/Common/CTAButton';
import Banner from '../assets/Images/banner.mp4';
import {CodeBlocks} from '../components/Common/codeBlocks';
import { ExploreMore } from '../components/Common/ExploreMore';
import { TimelineSection } from '../components/Common/TimelineSection';
import Instructor from "../assets/Images/Instructor.png";
import Footer from '../components/Common/Footer';
import CourseReviewSlider from '.././components/Common/courseReviewSlider'

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
            
            
            <div className='w-full mt-14 text-white'>
                <CodeBlocks
                    heading={
                        <div>
                            Unlock Your  
                            <HighlighText text={' coding potential '}/>
                             with our online courses
                        </div>
                    }
                    subHeading={'Our courses are designed and taught by college instructors who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                    button1={
                        <CTAButton linkto={'/catalog/engineering-physics'} active={true}>
                        <div className='flex items-center gap-2'>Try It Yourself <FaArrowRight/></div>
                        </CTAButton>
                    }
                    button2={
                        <CTAButton linkto={'/catalog/engineering-physics'} active={false}>Learn More</CTAButton>
                    }

                    codeBlock={`<<!DOCTYPE html">\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet "href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="one">One</a> <a href="two">Two</a>\n<a href="three">Three</a>\n</nav>`}
                    codeColor={"text-yellow-25"}
                    position={'flex-row'}
                />
            </div>
            
        </div>

        <div className='w-[80%] mt-24 text-white flex flex-col items-center mx-auto relative'>
           
            <ExploreMore/> 
            
            <div className='w-[100vw] bg-pure-greys-5 -translate-y-14 flex flex-col items-center'>
                <div className="bgHome w-full h-[250px] flex flex-row gap-8 justify-center items-center">
                    <CTAButton linkto={'/catalog/engineering-physics'} active={true}>
                        <div className='flex items-center gap-2'>Explore full catolog<FaArrowRight/></div>
                    </CTAButton>
                    <CTAButton linkto={'/catalog/engineering-physics'} active={false}>Learn more</CTAButton>
                </div>

                <div className='flex justify-center bg-pure-greys-5 w-[100vw] pt-10'>
                    <div className='text-richblack-900 flex flex-row gap-24 justify-center'>
                        <div className='text-3xl font-semibold'>Get the skills you need for a <br/><HighlighText text={"job that is in demand."}/></div>
                        <div className='flex flex-col w-[40%]'>
                            <p>Acquire essential skills for high-demand jobs with courses on ScholarSpace </p>
                        </div>
                    </div>
                    
                </div>

                <TimelineSection/>    
            </div>  
            
            <div className='flex gap-24'>
                <div className='w-[50%] shadow-white shadow-xl'>
                    <img src={Instructor} alt='Instructor'/>
                </div>
                <div className='flex flex-col justify-center'>
                    <h1 className='text-3xl font-semibold mb-4'>Become an <br/><HighlighText text={'Instructor'}/></h1>
                    <p>Instructors of colleges can teach millions of students with the help <br/> of ScholarSpace. We provide the tools and skills to teach what you love.</p>
                    <div className='mt-8 w-fit'>
                        <CTAButton linkto={'/dashboard/my-profile'} active={true}>
                        <div className='flex items-center gap-2'>Start Teaching Today<FaArrowRight/></div>
                        </CTAButton>
                    </div>
                </div>
            </div>
            
        </div>

        <CourseReviewSlider/>

        <Footer/>
    </div>
 )
}
