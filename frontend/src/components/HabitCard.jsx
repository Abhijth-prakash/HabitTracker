import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHabits } from '../redux/features/HabitSlice'

const HabitCard = () => {

      const dispatch = useDispatch()
          useEffect(()=>{
          dispatch(getHabits())
        
        },[])

    const {habits} = useSelector(state=> state.data)

     const listItems = habits && habits.map(item=> <li key={item._id}> 
        <span>{item.habit}</span>
        <button >done</button>
        <button>edit</button>
        <button>delete</button>
    
                                </li>) 
  return (
    <div><ol>{listItems}</ol></div>
  )
}

export default HabitCard