import React from 'react'

export const HighlighText = ({text}) => {
  return (
    <span className='font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#9CECFB] via-[#65C7F7] to-[#0052D4]'>{text}</span>
  )
}
