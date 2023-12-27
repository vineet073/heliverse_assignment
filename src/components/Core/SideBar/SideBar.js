import React, { useState } from 'react';
import { sidebarLinks } from '../../../data/dashboard-links';
import SideBarLinks from './SideBarLinks';
import ConfirmationModal from '../../Common/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../../services/AuthApi/AuthApi';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from "react-icons/vsc"


export default function SideBar()  {
    const{user,loading:profileLoading}=useSelector((state)=>state.profile);
    const{loading:authLoading}=useSelector((state)=>state.auth);
    // const user=JSON.parse(localStorage.getItem("user"));
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [open, setOpen] = useState(false)
    
    if(profileLoading||authLoading){
        return(
            <div className='spinner'></div>
        )
    }


  return (
    <div className={`text-white bg-richblack-800 w-[14%] pt-12 border-r-2 border-richblack-700
    `}>
      <div>
        {
            sidebarLinks.map((link)=>{
                if(link.type && link.type!==user?.accountType) return null;
                return(
                    <SideBarLinks key={link.id} name={link.name} iconName={link.icon} path={link.path}/>
                )
            })
        }
      </div>

      <div className='border-y-[1px] border-richblack-700 my-8 mx-4'></div>

      <div>
        <SideBarLinks name={"Settings"} iconName={"VscSettingsGear"} path={"/dashboard/settings"}/>

        <button
            onClick={()=>setOpen(prevState=>!prevState)}                    
            className='flex pl-7 items-center gap-2'>
            <VscSignOut className="text-base text-richblack-200" />
            <span className='text-richblack-200 text-base'>Logout</span>
        </button>
      </div>

      {open && <ConfirmationModal
              modalData={{
                text1:"Are you sure?",
                text2:"You will be logged out of current session.",
                btn1text:"Logout",
                btn2text:"Cancel",
                btn1handler:()=>dispatch(logout(navigate)),
                btn2handler:()=>setOpen(prevState=>!prevState)
              }}
              />}
    </div>

    
  )
}

