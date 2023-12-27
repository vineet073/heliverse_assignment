import React from 'react';
import { FooterLink2 } from '../../data/footer-links';
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import logo from "../../assets/Logo/edu area.jpeg"
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";


const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (

    <div className='bg-richblack-800 flex flex-col items-center justify-center mt-20 pt-16 w-screen'>
      <div className='flex flex-row  justify-center text-richblack-400 w-[70vw] px-16'>
        <div className='flex gap-12 border-r-2 pr-[4vw]'>

            <div className='flex gap-2 flex-col'>
                <div className='flex items-center gap-3'>
                    <Link to={"/"}>
                      <img src={logo} className='rounded-full aspect-square w-[50px]' loading='lazy'/>
                    </Link>
                  <p className='text-richblack-5 text-xl font-semibold'>EDUArea</p>
                </div>   
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

            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-1'>
                <h1 className='font-bold text-richblack-100'>Resources</h1>
                
                {Resources.map((element,index)=>{
                  return(
                    <Link to={"/element"} key={index} className='text-sm'>{element}</Link>
                  )
                })}
              </div>

              <div>
                <h1 className='font-bold text-richblack-100'>Support</h1>
                <Link to={"/helpcenter"} className='text-sm'>Help Center</Link>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-1'>
                <h1 className='font-bold text-richblack-100'>Plans</h1>
                
                {Plans.map((element,index)=>{
                  return(
                    <Link to={"/element"} key={index} className='text-sm'>{element}</Link>
                  )
                })}
              </div>

              <div className='flex flex-col gap-1'>
                <h1 className='font-bold text-richblack-100'>Community</h1>
                
                {Community.map((element,index)=>{
                  return(
                    <Link to={"/element"} key={index} className='text-sm'>{element}</Link>
                  )
                })}
              </div>
            </div>

        </div>

        <div className='flex gap-12 pl-[4vw]'>
            <div className='flex flex-col gap-1'>
                <h1 className='font-bold text-richblack-100'>{FooterLink2[0].title}</h1>
                
                {(FooterLink2[0].links).map((element,index)=>{
                  return(
                    <Link to={`${FooterLink2[0].links[index].link}`} key={index} className='text-sm'>{FooterLink2[0].links[index].title}</Link>
                  )
                })}
            </div>

            <div className='flex flex-col gap-1'>
                <h1 className='font-bold text-richblack-100'>{FooterLink2[1].title}</h1>
                
                {(FooterLink2[1].links).map((element,index)=>{
                  return(
                    <Link to={`${FooterLink2[1].links[index].link}`} key={index} className='text-sm'>{FooterLink2[1].links[index].title}</Link>
                  )
                })}
            </div>

            <div className='flex flex-col gap-1'>
                <h1 className='font-bold text-richblack-100'>{FooterLink2[2].title}</h1>
                
                {(FooterLink2[2].links).map((element,index)=>{
                  return(
                    <Link to={`${FooterLink2[2].links[index].link}`} key={index} className='text-sm'>{FooterLink2[2].links[index].title}</Link>
                  )
                })}
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

        <div className='flex items-center gap-2'>Made with <FaHeart className='text-pink-300'/> by Vineet </div>
      </div>
    </div>

  )
}

export default Footer;