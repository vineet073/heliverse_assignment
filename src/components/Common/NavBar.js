import React, { useState,useEffect } from 'react';
import logo from "../../assets/Logo/edu area.jpeg"
import { Link, matchPath, useLocation } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links';
import {IoIosArrowDown} from "react-icons/io"
import ApiConnector from '../../services/ApiConnector';
import { categories } from '../../services/Api';
import {AiOutlineShoppingCart} from "react-icons/ai";
import { useSelector } from 'react-redux';
import ProfileDropDown from '../Core/ProfileDropDown';



const NavBar = () => {
    const {user}=useSelector((state)=>state.profile);
    // const user=JSON.parse(localStorage.getItem("user"));
    const{totalItems}=useSelector((state)=>state.cart);
    const {token}=useSelector((state)=>state.auth);

    const [subLinks,setSubLinks]=useState([]);
    const location=useLocation();
    
    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname);
    }

    async function fetchSubLinks(){
        try {
            const result=await ApiConnector("GET",categories.CATEGORIES_API);
            setSubLinks(result.data.allCategorys);
            // console.log("Printing sublinks...",subLinks);
        } catch (error) {
            console.log("Could not fetch sublinks...",error);
        }
    }

    useEffect( () => {
        fetchSubLinks();
    },[] )

  return (
    <div className='w-full h-14 flex items-center justify-center border-b-[1px] border-richblack-700 text-white'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        <div className='flex items-center gap-3'>
            <Link to={"/"}>
                <img src={logo} className='rounded-full aspect-square w-10' loading='lazy'/>
            </Link>
            <p className='text-richblack-5 text-xl font-semibold'>EDUArea</p>
        </div>

        <div>
            <ul className='flex gap-5'>
                {
                    NavbarLinks.map((link,index)=>{
                        return <li key={index}>
                            {
                                link.title==="Catalog"?
                                (<div className='flex items-center gap-1 relative group'>
                                    <p>{link?.title}</p>
                                    <IoIosArrowDown/>

                                    <div className='lg:w-[170px] absolute bg-richblack-5  opacity-0 invisible group-hover:opacity-100 
                                    group-hover:visible top-9 -right-[51px] rounded-md transition-all duration-200 z-50'>
                                        <div className='w-6 h-6 rotate-45 absolute bg-richblack-5 -top-2 right-12  rounded-sm'></div>

                                        <div className='text-richblack-800 flex flex-col p-2'>
                                        {
                                            subLinks.length?
                                            (
                                            subLinks.map((subLink,index)=>{                    
                                                return(
                                                    <Link key={index} to={`/catalog/${subLink.title.split(" ").join("-").toLowerCase()}`}>
                                                        {subLink?.title}
                                                    </Link>
                                                )
                                            })
                                            ):<div></div>
                                        }
                                        </div>
                                    </div>
                                </div>):
                                (
                                    <Link to={link?.path}>
                                        <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                            {link.title}
                                        </p>                                
                                    </Link>
                                )
                            }
                        </li>
                    })
                }
            </ul>
        </div>

        <div className='flex gap-2 items-center justify-center w-40 h-10'>
            {
                user && user.accountType==="Student"&&
                (
                    <Link to={"/dashboard/cart"} className='relative'>
                        <AiOutlineShoppingCart className="w-10 h-6"/>
                        {
                            totalItems>0&&(
                            <span className='text-white absolute -top-1 transition-all duration-200 animate-bounce text-sm left-6 w-4 h-4 flex justify-center items-center 
                            rounded-full bg-caribbeangreen-400'>{totalItems}</span>)
                        }
                    </Link>
                )
            }

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
                token===null&&(
                    <Link to={"/signup"}>
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Sign Up
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
