import React from 'react';
import EditProfileImage from './EditProfileImage';
import EditDetails from './EditDetails';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';
import { useSelector } from 'react-redux';

const Settings = () => {
  const {user}=useSelector((state)=>state.profile);
  return (
    <div className='text-richblack-200'>
      <div className='text-3xl text-richblack-5 mb-12'>Edit Profile</div>
      <EditProfileImage/>
      <EditDetails/>  
      <ChangePassword/>
      {
        user?.accountType !== 'Admin' && (
        <DeleteAccount/>
        )
      }
    </div>
  )
}

export default Settings
