import React, { useState } from 'react';
import { HighlighText } from './HighlighText';
import { HomePageExplore } from '../../data/homepage-explore';



const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths",
];


export const ExploreMore = () => {
    const[currentTab,setCurrentTab]=useState(tabsName[0]);
    const[courses,setCourses]=useState(HomePageExplore[0].courses);
    const[currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

    const setCards=(element)=>{
        setCurrentTab(element);
        const result=HomePageExplore.filter((input)=>input.tag===element);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }



  return (
    <div className='flex flex-col items-center z-10'>
        <div className='text-4xl font-semibold'>Unlock the <HighlighText text={'Power of Code'}/></div>
        <div className='text-center text-sm text-richblack-200 mt-4'>Learn to build anything you can imagine</div>
        <div className='flex flex-row bg-richblack-800 p-1 rounded-full gap-4 mt-6'>
            {
                tabsName.map((element,index)=>{
                    return(
                        <div key={index} onClick={()=>setCards(element)}
                        className={`${currentTab===element?
                        "text-richblack-5 bg-richblack-900 rounded-full":"text-richblack-200"}
                        py-2 px-5 flex flex-row text-md transition-all duration-200
                        hover:bg-richblack-900 hover:text-richblack-5 rounded-full`}>{element}</div>
                    )
                })
            }
        </div>

        <div className='flex flex-row gap-16 justify-center mt-10 w-full'>
            {
                courses.map((element,index)=>{
                    return(
                        <div key={index} onClick={()=>setCards(element)}
                        className={`w-[280px] flex flex-col px-4 pt-4 pb-2 bg-white text-richblack-300
                        ${courses===element?"drop-shadow-xl shadow-yellow-700":"shadow-white"}`}>
                            <div className='text-richblack-900 font-semibold text-lg'>{element.heading}</div>
                            <div className='text-sm text-justify'>{element.description}</div>
                            <div className='border-dashed border mt-14 mb-1'></div>
                            <div className='flex flex-row justify-between'>
                                <div className='text-blue-300 font-semibold'>{element.level}</div>
                                <div className='text-blue-300 font-semibold'>{element.lessionNumber} Lessons</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
