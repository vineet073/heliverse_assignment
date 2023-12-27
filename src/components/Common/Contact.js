import React, { useEffect } from 'react';
import {set, useForm} from 'react-hook-form';
import { useState } from 'react';
import CountryCode from '../../data/countrycode.json'
import { CTAButton } from './CTAButton';
import ApiConnector from '../../services/ApiConnector'
import { contactusEndpoint } from '../../services/Api';

const Contact = () => {
    const [loading,setLoading]=useState(false);
    const{
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm();

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                firstname:"",
                lastname:"",
                email:"",
                phoneno:"",
                message:""
            })           
        }
    },[reset,isSubmitSuccessful]);

    const{CONTACT_US_API}=contactusEndpoint;
    const onSubmitHandler=async(data)=>{
        console.log("form data->",data);
        try {
            setLoading(true);
            const res=await ApiConnector("POST",
            CONTACT_US_API,
            data);
            console.log("response",res);
            setLoading(false);
        } catch (error) {
            console.log("Error:",error.message);
            setLoading(false);
        }
    }
  return (
    <div className=''>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className='flex gap-4 mb-3'>
            <div>
                <label htmlFor='firstname' className='text-sm'>First Name</label>
                <input
                    type='text'
                    placeholder='Enter First Name'
                    name='firstname'
                    id='firstname'
                    className='w-full rounded-md py-1 px-2 bg-richblack-700 style focus:outline-0'
                    {...register("firstname",{required:true})}/>
                {
                    errors.firstname &&(
                        <span>Please enter your first name</span>
                    )
                }
                
            </div>

            <div>
                <label htmlFor='lasttname' className='text-sm'>Last Name</label>
                <input
                    type='text'
                    placeholder='Last Name'
                    name='lastname'
                    id='lastname'
                    className='w-full rounded-md py-1 px-2 bg-richblack-700 style focus:outline-0'
                    {...register("lastname",{required:true})}/>
                {
                    errors.firstname &&(
                        <span>Please enter your last name</span>
                    )
                }
                
            </div>
        </div>

        <div className='mb-3'>
            <label htmlFor='email' className='text-sm'>Email</label>
            <input
                type='email'
                placeholder='Email'
                name='email'
                id='email'
                className='w-full rounded-md py-1 px-2 bg-richblack-700 style focus:outline-0'
                {...register("email",{required:true})}/>
            {
                errors.firstname &&(
                    <span>Please enter your email</span>
                )
            }                
        </div>

        <div className='mb-3'>
            <label htmlFor='phonenumber' className='text-sm'>Phone Number</label>
            
            <div className='flex gap-3'>

                <select
                    name='dropdown'
                    id='dropdown'
                    className='w-[30%] rounded-md py-1 px-2 bg-richblack-700 style focus:outline-0'
                    {...register("countrycode",{required:true})}>

                    {
                        CountryCode.map((element,index)=>{
                            return(
                                <option key={index} value={element.code}>
                                    {element.code} -{element.country}
                                </option>
                            )
                        })
                    }

                </select>

                <input
                type='number'
                placeholder='12345 67890'
                name='phonenumber'
                id='phonenumber'
                className='w-full rounded-md py-1 px-2 bg-richblack-700 style focus:outline-0'
                {...register("phoneno",
                {
                    required:{value:true, message:"Please enter phone number"},
                    maxLength:{value:10,message:"Invalid Phone Number"},
                    minLength:{value:10,message:"Invalid Phone Number"}
                    })}/>
               
            </div>
                {
                    errors.phoneno &&(
                        <span>{errors.phoneno.message}</span>
                    )
                }   
        </div>

        <div>
            <label htmlFor='message' className='text-sm'>Message</label>
            <textarea
                name='message'
                id='message'
                cols="30"
                className='w-full rounded-md py-1 px-2 bg-richblack-700 style focus:outline-0'
                rows="7"
                placeholder='Enter your message here'
                {...register("message",{required:true})}>
                    {
                        errors.message && (
                            <span>Please enter your message</span>
                        )
                    }
                </textarea>
        </div>

        <button type='submit' className='px-6 py-3 text-center rounded-md transition-all duration-200 hover:scale-95
        bg-yellow-50 text-black hover:shadow-sm hover:shadow-brown-25 font-semibold w-full mt-5'>Send Message</button>
      </form>
    </div>
  )
}

export default Contact
