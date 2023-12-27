import React from 'react';
import Contact from '../../Common/Contact';


const ContactUsSection = () => {
  return (
    <div className='w-[33%] flex flex-col items-center mt-40'>
      <h1 className='text-richblack-5 text-3xl text-center font-semibold'>Get in Touch</h1>
      <p className='mb-10'>We’d love to here for you, Please fill out this form.</p>
      <div><Contact/></div>
    </div>
  )
}

export default ContactUsSection
