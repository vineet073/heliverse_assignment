import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {addToCart} from '../../slices/cartSlice';
import copy from 'copy-to-clipboard';
import IconBtn from '../Common/IconBtn';
import { MdPlayArrow } from "react-icons/md";
import { RiShareForward2Fill } from "react-icons/ri";

const CourseDetailCard = ({course,setConfirmationModal,handleBuyCourse}) => {
    const{token}=useSelector((state)=>state.auth);
    const{user}=useSelector((state)=>state.profile);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const{
        thumbnail:ThumbnailImage,
        price:CurrentPrice
    }=course;

    function handleToCart(){
        if(user && user?.accountType === "Instructor"){
            toast.error("Instructor can't buy a course");
            return;
        }

        if(token){
            dispatch(addToCart(course));
            return;
        }

        setConfirmationModal({
            text1:"you are not logged in",
            text2:"Please login to add to cart",
            btn1text:"login",
            btn2text:"cancel",
            btn1handler:()=>navigate("/login"),
            btn2handler: ()=> setConfirmationModal(null),
        })
    }

    function handleShare(){
        copy(window.location.href);
        toast.success("Link Copied to clipboard");
    }
  return (
    <div className='text-white absolute top-16 w-[24vw]  bg-richblack-700 p-4 right-32 rounded-md'>
      <div>
        <img src={ThumbnailImage} className='rounded-md'/>
      </div>

      <div className='mt-3 p-2 flex flex-col gap-3'>
        <p className='text-2xl font-semibold'>Rs. {CurrentPrice}</p>
        <button onClick={user && course?.studentsEnrolled?.includes(user?._id) 
        ? ()=>navigate("/dashboard/enrolled-courses")
        :handleBuyCourse}
        className='bg-yellow-50 text-black hover:shadow-sm hover:shadow-brown-25 
        font-semibold px-5 py-2 text-center rounded-md transition-all duration-200 hover:scale-95'>
            {
                user && course?.studentsEnrolled?.includes(user?._id)?"Go to Course":"Buy Now"
            }
        </button>
        
        {
            user && course?.studentsEnrolled?.includes(user?._id)?"":(
                <button className='bg-richblack-800 text-white hover:shadow-sm hover:shadow-brown-25 
                font-semibold px-5 py-2 text-center rounded-md transition-all duration-200 hover:scale-95'
                onClick={handleToCart}>
                    Add to Cart
                </button>
            )
        }
      </div>

      <div>
        <p className='text-center text-sm my-2'>30-Day Money-Back Gurantee</p>
        <p className='text-lg font-semibold'>This Course Includes:</p>
        <div>
            {
                course?.instructions?.map((inst,index)=>{
                    return(
                        <div key={index} className='flex gap-1 items-baseline text-caribbeangreen-300 text-sm'>
                            <MdPlayArrow className=''/> 
                            <p>{inst}</p>
                        </div>
                    )
                })
            }
        </div>
      </div>

      <div>
         <button onClick={()=>handleShare()} className='flex gap-1 text-yellow-50 w-full justify-center items-center text-lg'>
            <RiShareForward2Fill className='text-sm'/>
            <p>Share</p>
         </button>
      </div>

    </div>
  )
}

export default CourseDetailCard
