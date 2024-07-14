import React from 'react'
import { useSelector } from 'react-redux';
import IconBtn from '../../Common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { RiEditBoxLine } from "react-icons/ri"

const MyProfile = () => {
  const {user}=useSelector((state)=>state.profile);
  const navigate=useNavigate();

  return (
    <div className='text-richblack-200 flex flex-col gap-10'>
      <div className='text-3xl'>My Profile</div>

      <div className='flex items-center justify-between bg-richblack-800 p-9 rounded-md border-[1px] border-richblack-600'>
        <div className='flex items-center gap-3'>
          <div >
            <img className='aspect-square rounded-full w-16' src={user?.image} alt=''/>
          </div>

          <div>
            <h1 className='text-richblack-5 mb-2'>{user?.firstName} {user?.lastName}</h1>
            <p className='text-sm'>{user?.email}</p>
          </div>
        </div>

        <div>
          <IconBtn
          onClick={()=>navigate("/dashboard/settings")}
          text={"Edit"}
          active={true}
          customClasses={"flex gap-2 items-center font-semibold"}
          ><RiEditBoxLine/>
          </IconBtn>
        </div>
      </div>

      <div className='flex items-center justify-between bg-richblack-800 p-9 rounded-md border-[1px] border-richblack-600'>
        <div className='flex items-center gap-3'>
         

          <div>
            <h1 className='text-richblack-5 text-xl font-medium mb-2'>About</h1>
            <p className='text-sm'>{user?.additionalDetails?.about ? user.additionalDetails.about:"Write something about yourself"}</p>
          </div>
        </div>

        <div>
          <IconBtn
          onClick={()=>navigate("/dashboard/settings")}
          text={"Edit"}
          active={true}
          customClasses={"flex gap-2 items-center font-semibold"}
          ><RiEditBoxLine/>
          </IconBtn>
        </div>
      </div>

      <div className='flex justify-between bg-richblack-800 p-9 rounded-md border-[1px] border-richblack-600'>
        <div className='flex flex-col  gap-3'>
          <div className='text-xl text-richblack-5 mb-6'>
            Personal Details
          </div>

          <div className='grid grid-cols-2 gap-x-40'>
            <div>
              <h1 className='text-sm'>First Name</h1>
              <p className='text-richblack-5 text-sm font-medium mt-2 mb-4'>{user?.firstName}</p>
            </div>

            <div>
              <h1 className='text-sm'>Last Name</h1>
              <p className='text-richblack-5 text-sm font-medium mt-2 mb-4'>{user?.lastName}</p>
            </div>

            <div>
              <h1 className='text-sm'>Email</h1>
              <p className='text-richblack-5 text-sm font-medium mt-2 mb-4'>{user?.email}</p>
            </div>

            <div>
              <h1 className='text-sm'>Phone Number</h1>
              <p className='text-richblack-5 text-sm font-medium mt-2 mb-4'>{user?.additionalDetails?.contactNumber}</p>
            </div>

            <div>
              <h1 className='text-sm'>Gender</h1>
              <p className='text-richblack-5 text-sm font-medium mt-2 mb-4'>{user?.additionalDetails?.gender}</p>
            </div>

            <div>
              <h1 className='text-sm'>Date of Birth</h1>
              <p className='text-richblack-5 text-sm font-medium mt-2 mb-4'>{user?.additionalDetails?.dateOfBirth}</p>
            </div>
            
          </div>
        </div>

        <div>
          <IconBtn
          onClick={()=>navigate("/dashboard/settings")}
          text={"Edit"}
          active={true}
          customClasses={"flex gap-2 items-center font-semibold"}
          ><RiEditBoxLine/>
          </IconBtn>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
