import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWeeklogs } from '../redux/features/HabitSlice'

const WeeklyCard = () => {

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getWeeklogs())
    },[dispatch])

    const {weeklogs,weekdates} = useSelector(state=> state.data) 
    
  return (
    <div>
        <h1>weeklogs</h1>
      
    </div>
  )
}

export default WeeklyCard
