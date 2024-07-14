import React from 'react';
import {FiTrash2} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from '../../../services/AuthApi/SettingApi';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
  const {token}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  async function onClickHandler(){
    try {
      dispatch(deleteAccount(token,navigate));
    } catch (error) {
      throw new Error(error);
    }
  }
  return (
    <div className='gap-5 bg-pink-900 p-9 flex rounded-md border-[1px] border-richblack-600 mt-12'>
      <div className='aspect-square bg-pink-600 h-fit p-3 rounded-full'><FiTrash2 className="text-3xl text-pink-200" /></div>
      <div>
        <h1 className='text-richblack-5 text-xl font-semibold mb-2'>Delete Account</h1>
        <p className='text-pink-25'>Would you like to delete account?<br/>
        This account may contain Paid Courses.<br/>
        Deleting your account is permanent and will remove all the contain associated with it.
        </p><br/>
        <button onClick={()=>onClickHandler()} className='text-pink-100 italic'>I want to delete my account</button>
      </div>
    </div>
  )
}

export default DeleteAccount
