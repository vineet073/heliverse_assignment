import React from 'react'

const IconBtn = (
    {text,
    children,
    onClick,
    active,
    customClasses,
    type}
) => {
  return (
    <button className={`px-5 py-2 text-center rounded-md transition-all duration-200 hover:scale-95
    ${active?"bg-yellow-50 text-black hover:shadow-sm hover:shadow-brown-25":
    "bg-richblack-800 hover:shadow-sm hover:shadow-richblack-200"}
    ${customClasses}`}
    onClick={onClick}
    type={type}>
      {
        children?(
            <>
                <span>{text}</span>
                <span>{children}</span>
            </>
        ):(
            <span>{text}</span>
        )
      }
    </button>
  )
}

export default IconBtn
