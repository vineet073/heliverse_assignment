import React from 'react';
import ContactDetails from '../components/Core/Contact/ContactDetails';
import Contact from '../components/Common/Contact';
import Footer from '../components/Common/Footer'



const ContactUs = () => {
  return (
    <div className='mt-14'>
      <div className='flex gap-14 justify-center'>
        <ContactDetails/>
        <div className='w-[30%] text-richblack-200 outline-1 rounded-md p-7 outline outline-richblack-600'>
          <h1 className='text-richblack-5 text-2xl font-semibold'>Have a doubt regarding courses</h1>
          <p className='mb-5'>Tell us more about yourself and what you’re stuck at.</p>
          <Contact/>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default ContactUs
