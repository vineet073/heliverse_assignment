import React from 'react'

const Tab = ({tabData,field,setField}) => {
  return (
    <div className='flex gap-2 bg-richblack-800 w-fit p-1 rounded-full mb-4'
        style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}>
      {
        tabData.map((data,index)=>{
            return(
                <div key={data.id} onClick={()=>setField(data.tabName)}
                className={`${data.tabName===field?"bg-richblack-900 text-richblack-5":"bg-transparent text-richblack-200"}
                rounded-full py-1 px-4`}>
                    {data.tabName}
                </div>
            )
        })
      }
    </div>
  )
}

export default Tab
