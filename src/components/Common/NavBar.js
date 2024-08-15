import React from 'react';
import logo from "../../assets/Logo/website-logo.jpeg"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileDropDown from '../Core/ProfileDropDown';



const NavBar = () => {

    const {token}=useSelector((state)=>state.auth);
    

  return (
    <div className='w-full h-16 flex items-center justify-center border-b-[1px] border-richblack-700 text-white'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        <div className='flex items-center gap-3'>
            <Link to={"/"}>
                <img src={logo} className='rounded-full aspect-square w-10' loading='lazy' alt=''/>
            </Link>
            <p className='text-richblack-5 text-xl font-semibold'>ScholarSpace</p>
        </div>


        <div className='flex gap-2 items-center justify-center w-40 h-10'>


            {
                token===null&&(
                    <Link to={"/login"}>
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Login
                        </button>
                    </Link>
                )
            }

            {
                token!==null&& (<ProfileDropDown/>)
                
            }
        </div>
      </div>      
    </div>
  )
}

export default NavBar
