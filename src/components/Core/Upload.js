import React, { useRef, useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FiUpload } from "react-icons/fi"
import IconBtn from '../Common/IconBtn'
import ApiConnector from '../../services/ApiConnector'
import { settingsEndpoints } from '../../services/Api'


const Upload = () => {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)

    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)
  
    const fileInputRef = useRef(null)
  
    const handleOnClick = () => {
      fileInputRef.current.click()
    }
  
    const handleFileChange = (e) => {
      const file = e.target.files[0]
      // console.log(file)
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
  
    const handleFileUpload = async() => {
      try {
        setLoading(true)
        const formData = new FormData()
        formData.append("timetable", imageFile)
        formData.append("id", user?._id)
        formData.append("classroom", user?.classroom)
        const response = await ApiConnector("POST", settingsEndpoints.UPLOAD_API, formData, {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        });

        if(response.data.success){
            setLoading(false)
            setImageFile(null)
            setPreviewSource(response.data.data)
        }

        console.log(response)
      } catch (error) {
        throw new Error(error);
      }
    }
  
    useEffect(() => {
      if (imageFile) {
        previewFile(imageFile)
      }
    }, [imageFile])

  return (
    <div className='flex flex-col gap-5 bg-richblack-800 p-8 rounded-md border-[1px] border-richblack-600'>
     <div>

        <div className='text-richblack-5 mb-2'>Upload Timetable</div>
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

      <div >
            <img 
            src={previewSource || user?.timetable}/>
        </div>
    </div>
  )
}

export default Upload
