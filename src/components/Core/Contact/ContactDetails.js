import React from 'react';
import * as Icon1 from 'react-icons/bi';
import * as Icon2 from 'react-icons/io5';
import * as Icon3 from 'react-icons/hi2';

const contactDetails = [
    {
      icon: "HiChatBubbleLeftRight",
      heading: "Chat on us",
      description: "Our friendly team is here to help.",
      details: "info@studynotion.com",
    },
    {
      icon: "BiWorld",
      heading: "Visit us",
      description: "Come and say hello at our office HQ.",
      details:
        "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    },
    {
      icon: "IoCall",
      heading: "Call us",
      description: "Mon - Fri From 8am to 5pm",
      details: "+123 456 7869",
    },
  ]
  

const ContactDetails = () => {
  return (
    <div className='text-richblack-200 bg-richblack-800 w-[26%] p-6 rounded-md h-fit'>
      {
        contactDetails.map((element,index)=>{
            let Icon=Icon1[element.icon]||Icon2[element.icon]||Icon3[element.icon];

            return(
                <div key={index} className='flex items-start  gap-3 mb-8 '>
                    <div><Icon size={20}/></div>
                    <div>
                        <h1 className='text-richblack-5 text-md'>{element?.heading}</h1>
                        <p className='text-sm ]'>{element?.description}</p>
                        <p className='text-sm'>{element?.details}</p>
                    </div>
                </div>
            )
        })
      }
    </div>
  )
}

export default ContactDetails
