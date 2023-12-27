import React from 'react';
import {FaArrowRight} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { HighlighText } from '../components/Common/HighlighText';
import { CTAButton } from '../components/Common/CTAButton';
import Banner from '../assets/Images/banner.mp4';
import {CodeBlocks} from '../components/Common/codeBlocks';
import { ExploreMore } from '../components/Common/ExploreMore';
import { TimelineSection } from '../components/Common/TimelineSection';
import { LanguageSection } from '../components/Common/LanguageSection';
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
             quizzes, and personalized feedback from instructors.
            </div>

            <div className='mt-7 gap-7 font-medium flex '>
                <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
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
                    subHeading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                    button1={
                        <CTAButton linkto={'/signup'} active={true}>
                        <div className='flex items-center gap-2'>Try It Yourself <FaArrowRight/></div>
                        </CTAButton>
                    }
                    button2={
                        <CTAButton linkto={'/login'} active={false}>Learn More</CTAButton>
                    }

                    codeBlock={`<<!DOCTYPE html">\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet "href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="one">One</a> <a href="two">Two</a>\n<a href="three">Three</a>\n</nav>`}
                    codeColor={"text-yellow-25"}
                    position={'flex-row'}
                />
            </div>

            <div className='w-full mt-32 text-white'>
                <CodeBlocks
                    heading={
                        <div className='flex flex-col'>
                            Start  
                            <HighlighText text={`coding in seconds`}/>
                            
                        </div>
                    }
                    subHeading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                    button1={
                        <CTAButton linkto={'/signup'} active={true}>
                        <div className='flex items-center gap-2'>Try It Yourself <FaArrowRight/></div>
                        </CTAButton>
                    }
                    button2={
                        <CTAButton linkto={'/login'} active={false}>Learn More</CTAButton>
                    }

                    codeBlock={`<<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet "href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="one">One</a> <a href="two">Two</a>\n<a href="three">Three</a>\n</nav>`}
                    codeColor={"text-yellow-25"}
                    position={'flex-row-reverse'}
                />
            </div>
            
        </div>

        <div className='w-[80%] mt-24 text-white flex flex-col items-center mx-auto relative'>
           
            <ExploreMore/> 
            
            <div className='w-[100vw] bg-pure-greys-5 -translate-y-14 flex flex-col items-center'>
                <div className="bgHome w-full h-[250px] flex flex-row gap-8 justify-center items-center">
                    <CTAButton linkto={'/signup'} active={true}>
                        <div className='flex items-center gap-2'>Explore full catolog<FaArrowRight/></div>
                    </CTAButton>
                    <CTAButton linkto={'/login'} active={false}>Learn more</CTAButton>
                </div>

                <div className='flex justify-center bg-pure-greys-5 w-[100vw] pt-10'>
                    <div className='text-richblack-900 flex flex-row gap-24 justify-center'>
                        <div className='text-3xl font-semibold'>Get the skills you need for a <br/><HighlighText text={"job that is in demand."}/></div>
                        <div className='flex flex-col w-[40%]'>
                            <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <div className='w-fit mt-10'><CTAButton linkto={"/signup"} active={true}>Learn More</CTAButton></div>
                        </div>
                    </div>
                    
                </div>

                <TimelineSection/>    

                <LanguageSection/>
            </div>  
            
            <div className='flex gap-24'>
                <div className='w-[50%] shadow-white shadow-xl'>
                    <img src={Instructor}/>
                </div>
                <div className='flex flex-col justify-center'>
                    <h1 className='text-3xl font-semibold mb-4'>Become an <br/><HighlighText text={'Instructor'}/></h1>
                    <p>Instructors from around the world teach millions of students on<br/> StudyNotion. We provide the tools and skills to teach what you<br/> love.</p>
                    <div className='mt-8 w-fit'>
                        <CTAButton linkto={'/signup'} active={true}>
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
