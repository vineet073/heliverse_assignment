import React, { useEffect, useState } from 'react'
import { getInstructors, getStudents, getStudentsByClassroom } from '../../services/AuthApi/ProfileApi';
import { useSelector } from 'react-redux';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteAccount } from '../../services/AuthApi/SettingApi';


const UserList = () => {
    const [allUsers, setAllUsers] = useState([]);
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    console.log(user);
    const navigate=useNavigate();
    const location = useLocation();


    async function fetchApprovedUsers() {
        let result;
        if (location.pathname === '/dashboard/manage_instructors') {
            result = await getInstructors(token);
        } else if (location.pathname === '/dashboard/manage_students') {
            result = await getStudents(token);
        } else{
            result = await getStudentsByClassroom(user?.classroom,token)
        }

        setAllUsers(result.data.data);
    }

    async function handleDeleteInstructor(id){
        console.log(id);
        try {
            const response=await deleteAccount(id,token);
        } catch (error) {
            
        }
    }

    useEffect( () => {
        fetchApprovedUsers();
    },[] );

  return (
    <div className='text-white'>
  
    {
        !allUsers ? (<div className='spinner'>
        </div>)
        : !allUsers.length ? (<div className='flex flex-col gap-5 justify-center items-center h-[60vh]'>
            <p className='text-richblack-100'>There are no verified users on the platform.</p>
        </div>)
        : (
            <div>
                <div className='flex bg-richblack-600 p-2 rounded-t-md text-richblack-25'>
                    <p className='max-w-[40%] min-w-[40%]'>User Details</p>
                    <p className='max-w-[30%] min-w-[30%] text-center'>Assigned Classroom</p>
                    <p className='max-w-[30%] min-w-[30%] text-center'>Action</p>
                </div>

                {
                    allUsers.map((user,index)=> (
                        <div key={index} className='flex p-3 border-1 rounded-b-md border border-richblack-700'>
                            <div className='flex max-w-[40%] min-w-[40%] flex-col'>
                                <p className='text-lg text-richblack-25'>{user.userName}</p>
                                <p className='text-richblack-100'>{user?.email}</p>
                            </div>
                            
                            <div className='max-w-[30%] min-w-[30%] text-center'>
                                <p>{user?.classroom?.title}</p>                               

                            </div>

                            <div className='flex gap-5 justify-center max-w-[30%] min-w-[30%]'>
                                <MdEdit size={22} className='hover:text-caribbeangreen-300 transition-all duration-200'
                                onClick={() => navigate(`/dashboard/edit-instructor/${user._id}`)}/>
                                <MdDelete size={22} className='hover:text-pink-300 transition-all duration-200' onClick={()=>handleDeleteInstructor(user._id)}/>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
  
    </div>
  )
}

export default UserList
