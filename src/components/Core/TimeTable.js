import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ApiConnector from '../../services/ApiConnector'
import { courseEndpoints } from '../../services/Api'

const TimeTable = () => {
    const{token}=useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile)
    const classroom=user?.classroom
    const [timetable,setTimetable]=useState('');

    async function getTimeTable(){
        try {
            const response = await ApiConnector("POST", courseEndpoints.GET_TIME_TABLE_API,{classroom},
                {
                    "Authorization":`Bearer ${token}`
                }
            )

            console.log("TimeTable",response.data.classroomDetails);
            setTimetable(response?.data?.classroomDetails?.timetable)
            if(!response.data){
                throw new Error(response.data.message)
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    useEffect(()=>{
        getTimeTable()
    },[])
  return (
    <div>
        <p className='text-xl text-richblack-25 font-semibold mb-5'>Timetable</p>
        <img src={timetable} alt='Timetable is not availabe.'/>
    </div>
  )
}

export default TimeTable