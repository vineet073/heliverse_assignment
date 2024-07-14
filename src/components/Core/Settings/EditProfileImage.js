import React, { useRef, useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../Common/IconBtn';
import { FiUpload } from "react-icons/fi"
import { updateDisplayPicture } from '../../../services/AuthApi/SettingApi';

const EditProfileImage = () => {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch()
  
    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)
  
    const fileInputRef = useRef(null)
  
    const handleOnClick = () => {
      fileInputRef.current.click()
    }
  
    const handleFileChange = (e) => {
      const file = e.target.files[0]
      if (file) {
        setImageFile(file)
        previewFile(file)
      }
    }
  
    const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviewSource(reader.result)
      }
    }
  
    const handleFileUpload = () => {
      try {
        setLoading(true)
        const formData = new FormData()
        formData.append("displayPicture", imageFile)
        dispatch(updateDisplayPicture(token, formData)).then(() => {
          setLoading(false)
        })
      } catch (error) {
        throw new Error(error)
      }
    }
  
    useEffect(() => {
      if (imageFile) {
        previewFile(imageFile)
      }
    }, [imageFile])

  return (
    <div className='flex gap-5 bg-richblack-800 p-8 rounded-md border-[1px] border-richblack-600'>
        <div >
            <img className='aspect-square rounded-full w-20' 
            src={previewSource||user?.image} alt={`Profile-${user?.firstName}`}/>
        </div>

      <div>

        <div className='text-richblack-5 mb-2'>Change Profile Picture</div>
        <div className='flex gap-3'>
            <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                accept='image/jpg, image/jpeg, image/png'
                className='hidden'
            ></input>

            <button
            onClick={handleOnClick}
            disabled={loading}
            className='bg-richblack-600 text-richblack-100 rounded-md py-2 px-4'>Select
            </button>

            <IconBtn
            text={loading ?"Uploading...":"Upload"}
            onClick={handleFileUpload}
            customClasses={"bg-yellow-50 flex gap-2 items-center font-semibold text-richblack-900"}>
                {
                    !loading &&(
                        <FiUpload/>
                    )
                }
            </IconBtn>
        </div>

      </div>
    </div>
  )
}

export default EditProfileImage
