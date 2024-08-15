import React from 'react'
import { CTAButton } from './CTAButton'

const ConfirmationModal = ({modalData}) => {  
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen 
    place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm" >
        <div className='bg-richblack-800 p-7 border border-richblack-200 rounded-lg'>
            <p className='text-2xl text-richblack-5 font-semibold mb-3'>{modalData.text1}</p>
            <p className='text-richblack-100 mb-3'>{modalData.text2}</p>

            <div className='flex gap-3'>
                <button onClick={modalData?.btn1handler}className='font-semibold'>
                    <CTAButton  active={true}>{modalData?.btn1text}</CTAButton>
                </button>

                <button onClick={modalData?.btn2handler} 
                className={`px-5 py-2 text-center rounded-md transition-all duration-200 hover:scale-95
                bg-richblack-600 hover:shadow-sm hover:shadow-richblack-200}`}>
                {modalData?.btn2text}</button>

            </div>
        </div>        

    </div>
  )
}

export default ConfirmationModal
