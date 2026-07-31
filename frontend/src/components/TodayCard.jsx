import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLogs } from '../redux/features/HabitSlice'

const TodayCard = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getLogs())
    },[])

    const data = useSelector
  return (
    <div>
        <h1>hi</h1>
    </div>
  )
}

export default TodayCard
