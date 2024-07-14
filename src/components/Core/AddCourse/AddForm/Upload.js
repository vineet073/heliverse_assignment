import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import ReactPlayer from 'react-player';

const Upload = ({
    name,
    label,
    register,
    errors,
    setValue,
    video=false,
    viewData=null,
    editData=null,
    pdf=false
}) => {

    const[selectedFile,setSelectedFile]=useState(null);
    const[previewSource,setPreviewSource]=useState(
        viewData? viewData: editData? editData:""
    )
    const inputRef=useRef(null);

    function onDrop(acceptedFiles){
        const file=acceptedFiles[0];
        if(file){
            setSelectedFile(file);
            preview(file);
        }
    }

    const {getRootProps,getInputProps}=useDropzone({
        accept: video
            ? { 'video/*': ['.mp4'] }
            : pdf
            ? { 'application/pdf': ['.pdf'] }
            : { 'image/*': ['.jpeg', '.jpg', '.png'] },
        onDrop
    });

    function preview(file){
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setPreviewSource(reader.result);
        }
    }


    useEffect(()=>{
        register(name,{required:true});
    },[register])

    useEffect(()=>{
        setValue(name,selectedFile)
    },[setValue,selectedFile])

    return (
    <div>
      <label htmlFor={name} className='text-richblack-25 text-sm'>
        {label} <sup className='text-pink-400'>*</sup>
      </label>

      <div className='border border-dashed rounded-md border-richblack-300 bg-richblack-700 p-9 mt-2'>
        {
            previewSource ?
            (<div className='flex items-center flex-col justify-center w-full min-h-[250px]'>
                {
                    video?(<ReactPlayer playing={true} controls={true} url={previewSource}></ReactPlayer>)
                    :(<img src={previewSource} alt='preview' className='h-full object-cover'></img>)
                }
                {
                    !viewData &&
                    <button onClick={()=>{
                        setPreviewSource("")
                        setSelectedFile(null)
                        setValue(name,null)
                    }}>Cancel</button>
                }
            </div>):
            (<div
               className='flex flex-col items-center' {...getRootProps()}>
                <input {...getInputProps()} ref={inputRef}/>
                <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                <FiUploadCloud className="text-2xl text-yellow-50" />
                 </div>
                <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                Drag and drop here                
                </p>
            </div>)
        }
      </div>
      {
        errors[name]&&(
            <span>
                {label} is required
            </span>
        )
      }
    </div>
  )
}

export default Upload
