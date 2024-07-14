import React from 'react';
import Logo1 from "../../assets/TimeLineLogo/Logo1.svg"
import Logo3 from "../../assets/TimeLineLogo/Logo3.svg"
import Logo2 from "../../assets/TimeLineLogo/Logo2.svg"
import Logo4 from "../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../assets/Images/TimelineImage.png";

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description:"Students will always be our top priority",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description:"The ability to switch is an important skills",
    },
    {
        Logo: Logo4,
        heading: "Solve the problem",
        Description:"Code your way to a solution",
    },
];


export const TimelineSection = () => {
  return (
    <div className='flex flex-row justify-center mx-auto bg-pure-greys-5 w-[80%] text-richblack-900 pt-20 gap-32 mb-28'>
       
        
            <div className='mt-20'>
                {
                    timeline.map((element,index)=>{
                        return(
                            <div key={index} className='flex items-center gap-4 text-sm'>
                                <div className='flex flex-col items-center mt-2 gap-2'>
                                    <div className={`${index>0?"block":"hidden"} h-8 border-l w-1 border-dashed `}></div>
                                    <div className='w-[45px] h-[45px] rounded-full bg-white flex items-center justify-center'><img src={element.Logo}></img> </div> 
                                </div>
                                <div className='pt-7'>
                                    <h1 className='text-md font-semibold'>{element.heading}</h1>
                                    <p className='text-sm text-richblack-600'>{element.Description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className=''>

                <div className='relative'> 
                    <img src={timelineImage}></img>
                    
                    <div className='absolute flex py-7 translate-x-32 -translate-y-10 bg-caribbeangreen-700 text-white'>
                        <div className='flex gap-5 px-7 items-center border-r'>
                            <div className='text-3xl font-semibold '>30+</div>
                            <div className='text-sm text-caribbeangreen-200'>Experienced<br/> Professors</div>
                        </div>
                        <div className='flex gap-5 px-7 items-center'>
                            <div className='text-3xl font-semibold '>50+</div>
                            <div className='text-sm text-caribbeangreen-200'>TYPES OF <br/>COURSES</div>
                        </div>
                    </div>
                </div>    
                
            </div>

        
    </div>
  )
}
