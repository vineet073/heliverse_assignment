import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,Navigation, Pagination}  from 'swiper/modules'
import CourseCard from './CourseCard'

const CourseSlider = ({Courses}) => {
  return (
    <div>
        {
            Courses?.length ? (
                <Swiper
                    slidesPerView={3}
                    loop={true}
                    spaceBetween={50}
                    pagination={true}
                    modules={[Autoplay,Navigation]}
                    className="mySwiper"
                    autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                    }}
                    navigation={true}
                    breakpoints={{
                        1024:{slidesPerView:3}
                    }}
                >
                    {
                        Courses?.map((course, index)=> (
                            <SwiperSlide key={index}>
                                <CourseCard course={course} Height={"h-[250px]"} />
                            </SwiperSlide>
                        ))
                    }   
                </Swiper>
            ) : (
                <p>No Course Found</p>
            )

        }
    </div>
  )
}

export default CourseSlider
