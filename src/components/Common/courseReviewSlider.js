import React, { useEffect, useState } from 'react'
import ApiConnector from '../../services/ApiConnector';
import { ratingsEndpoints } from '../../services/Api';
import { Swiper, SwiperSlide } from "swiper/react"
import ReactStars from "react-rating-stars-component"
import { Autoplay, FreeMode, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
import { FaStar,FaRegStar } from 'react-icons/fa6';

const CourseReviewSlider = () => {
    const[reviews,setReviews]=useState([]);

    async function getRating(){
        const res=await ApiConnector("GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
        );

        setReviews(res?.data?.data)
    }
    console.log("review",reviews);

    useEffect(()=>{
        getRating();
    },[]);

  return (
    <div className='text-richblack-5 mt-16 px-14'>
        <h1 className='text-center text-4xl font-semibold mb-6'>Reviews from our learners</h1>
      <div>
        <Swiper
        slidesPerView={4}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full ">
            {
                reviews.map((data,index)=>(
                    <SwiperSlide key={index}>
                        <div className='bg-richblack-800 p-3 rounded-md'>
                            <div className='flex gap-5'>
                                <img src={
                                    data?.user?.image ?
                                    data.user.image : 
                                    `https://api.dicebear.com/5.x/initials/svg?seed=${data?.user?.firstName} ${data?.user?.lastName}`
                                } className='rounded-full aspect-square w-12'/>

                                <div>
                                    <p>{data?.user?.firstName}  {data?.user?.lastName}</p>
                                    <p className='text-richblack-300'>{data?.course?.courseName}</p>
                                </div>
                            </div>

                            <div className='mt-2 text-richblack-50 mb-3'>
                                {
                                    data?.review?.split(" ").length >15 ?
                                    `${data.review.split(" ")
                                    .splice(0,15)
                                    .join("")}...`:`${data.review}`
                                }
                            </div>

                            <div className="flex items-center gap-2 ">
                                <h3 className="font-semibold text-yellow-100">
                                {data?.rating?.toFixed(1)}
                                </h3>
                                <ReactStars
                                count={5}
                                value={data.rating}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<FaRegStar/>}
                                fullIcon={<FaStar />}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
      </div>
    </div>
  )
}

export default CourseReviewSlider
