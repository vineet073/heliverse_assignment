import React from 'react';
import { TypeAnimation } from 'react-type-animation';

export const CodeBlocks = ({heading,subHeading,button1,button2,codeBlock,codeColor,position}) => {
  return (
    <div className={`flex ${position} justify-between gap-12 mx-auto w-[90%]`}>
        <div className='w-[36%]'>
            <div className='text-3xl'>{heading}</div>
            <div className='text-richblack-200 mt-2 mb-16'>{subHeading}</div>
            <div className='flex gap-4'>
                {button1}
                {button2}
            </div>
        </div>

        <div className='flex flex-row w-[38%] borde border-richblack-25 gap-1' >
            <div>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
            </div>

            <div>
                <TypeAnimation
                    sequence={[codeBlock,1000,""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}

                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block"
                        }
                    }
                />
            </div>
        </div>
    </div>
  )
}
