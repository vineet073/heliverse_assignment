import React, { useEffect, useState } from 'react';
import {
    TiStarFullOutline,
    TiStarHalfOutline,
    TiStarOutline,
  } from "react-icons/ti"


const RatingStars = ({avgReviewCount,Star_Size}) => {
    const [starCount,setStarCount]=useState({
        full:0,
        half:0,
        empty:0
    });
    
    useEffect(()=>{
        const fullStars=Math.floor(avgReviewCount) || 0;
        setStarCount({
            full:fullStars,
            half:Number.isInteger(avgReviewCount)?0:1,
            empty:Number.isInteger(avgReviewCount)?5-fullStars: 4-fullStars
        });
        
    },[avgReviewCount])
  return (
    <div className='flex text-yellow-50 gap-[0.17rem] pr-2'>
      {
        [...new Array(starCount.full)].map((_,i)=>{
            return <TiStarFullOutline key={i} size={Star_Size || 20}/>
        })
      }

      {
        [...new Array(starCount.half)].map((_,i)=>{
            return <TiStarHalfOutline key={i} size={Star_Size || 20}/>
        })
      }

      {
        [...new Array(starCount.empty)].map((_,i)=>{
            return <TiStarOutline key={i} size={Star_Size || 20}/>
        })
      }
    </div>
  )
}

export default RatingStars;
