import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AvgRating from '../../services/AvgRating';
import RatingStars from './RatingStars';

const CourseCard = ({course,Height}) => {
    const[avgReviewCount,setAvgReviewCount]=useState(0);
    useEffect(()=>{
        const count=AvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course]);
  return (
    <div className='aspect-square'>
       <Link to={`/courses/${course._id}`}>
            <div>
                <div>
                    <img
                        src={course.thumbnail}
                        className={`${Height} rounded-lg object-cover`}
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <p className='text-xl mt-3'>{course?.courseName}</p>
                    <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div className='flex gap-1'>
                        <span>{avgReviewCount || 0}</span>
                        <RatingStars avgReviewCount={avgReviewCount} />
                        <span className='text-richblack-300'>{course?.ratingAndReviews?.length} Ratings</span>
                    </div>
                    <p>Rs. {course?.price}</p>
                </div>
            </div>
       </Link>
    </div>
  )
}

export default CourseCard
