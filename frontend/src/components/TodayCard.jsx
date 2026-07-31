import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLogs } from '../redux/features/HabitSlice'

const TodayCard = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getLogs())
    },[])

    const {logs} = useSelector(state=> state.data)
    const listItems = logs&& logs.map(item=> <li key={item._id}>
        <span>{item.habit}</span>
        <span>{item.completed}</span>
        </li>)
  return (
    <div>
        <ol>{listItems}</ol>
    </div>
  )
}

export default TodayCard
