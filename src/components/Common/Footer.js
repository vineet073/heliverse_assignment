import React from 'react';
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import logo from "../../assets/Logo/website-logo.jpeg"
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";


const Footer = () => {
  return (

    <div className='bg-richblack-800 flex flex-col items-center justify-center mt-20 pt-16 w-screen'>
      <div className='flex flex-row  justify-center text-richblack-400 w-[70vw] px-16'>
        <div className='flex gap-12 border-r-2 pr-[4vw]'>
            <div className='flex gap-2 flex-col'>
                <div className='flex items-center gap-3'>
                    <Link to={"/"}>
                      <img src={logo} className='rounded-full aspect-square w-[120px]' loading='lazy' alt=''/>
                    </Link>
                  <p className='text-richblack-5 text-2xl font-medium'>ScholarSpace</p>
                </div>                            
            </div>
        </div>

        <div className='ml-14'>
          <div className='flex flex-col gap-1'>
            <h1 className='font-bold text-richblack-100 '>Company</h1>
            <Link to={"/about"} className='text-sm'>About</Link>
            <Link to={"/about"} className='text-sm'>Careers</Link>
            <Link to={"/about"} className='text-sm'>Affilliates</Link>
          </div>
          <div className='flex gap-3'>
            <FaFacebook/>
            <FaGoogle/>
            <FaTwitter/>
            <FaYoutube/>
          </div> 
        </div>
      </div>

      <div className='border-t w-[70vw] border-richblack-700 mt-10 flex justify-between text-richblack-300 py-8'>
        <div className='flex gap-3'>
          <p>Privacy Policy </p>
          <p>|</p>
          <p>Cookies </p>
          <p>|</p>
          <p>Terms</p>
        </div>

        <div className='flex items-center gap-2'>Made with <FaHeart className='text-pink-300'/> </div>
      </div>
    </div>

  )
}

export default Footer;