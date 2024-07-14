import React from 'react';
import { HighlighText } from './HighlighText';
import compare_with_others from "../../assets/Images/Compare_with_others.png"
import know_your_progress  from "../../assets/Images/Know_your_progress.png"
import plan_your_lesson from "../../assets/Images/Plan_your_lessons.png"
import { CTAButton } from './CTAButton';

export const LanguageSection = () => {
  return (
    <div className='w-[80%] flex flex-col items-center mt-36 mb-14 text-richblack-900 mx-auto'>
        <div className='text-3xl font-semibold'>Your Swiss Knife for <HighlighText text={"learning any language"}/></div>
        <div className='text-center w-[60%]'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className='flex mt-12'>
            <img src={know_your_progress} className='translate-x-20' alt=''/>
            <img src={compare_with_others} className='-translate-x-10' alt=''/>
            <img src={plan_your_lesson} className='-translate-x-44' alt=''/>
        </div>
        <div className='w-fit mt-10'>
            <CTAButton linkto={'/login'} active={true}>Learn More</CTAButton>
        </div>
    </div>
  )
}
