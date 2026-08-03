import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getWeeklogs } from '../redux/features/HabitSlice'

const WeeklyCard = () => {

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getWeeklogs())
    },[dispatch])
  return (
    <div>
        <h1>weeklogs</h1>
      
    </div>
  )
}

export default WeeklyCard
