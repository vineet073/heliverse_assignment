import React from 'react'
import { Link } from 'react-router-dom'

export const CTAButton = ({linkto,active,children}) => {
  return (
    <Link to={linkto}>
        <div className={`px-5 py-2 text-center rounded-md transition-all duration-200 hover:scale-95
        ${active?"bg-yellow-50 text-black hover:shadow-sm hover:shadow-brown-25":"bg-richblack-800 hover:shadow-sm hover:shadow-richblack-200"}`}>
            {children}
        </div>
    </Link>
  )
}
