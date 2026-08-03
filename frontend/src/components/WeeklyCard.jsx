import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWeeklogs } from '../redux/features/HabitSlice'

const WeeklyCard = () => {

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getWeeklogs())
    },[dispatch])

    const {weeklogs} = useSelector(state=> state.data) 
        const listItems = weeklogs && weeklogs.map(habit=> <li key={habit.habitId}> 
        <span>{habit.habit}</span>   
        <span>{habit.percentage}</span>   
     </li>)


  return (
    <div>
        <h1>{listItems}</h1>
      
    </div>
  )
}

export default WeeklyCard
