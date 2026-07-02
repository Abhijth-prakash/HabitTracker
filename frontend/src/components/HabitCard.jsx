import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHabits } from '../redux/features/HabitSlice'
import DeleteCard from './DeleteCard'

const HabitCard = () => {

      const dispatch = useDispatch()
          useEffect(()=>{
          dispatch(getHabits())
        
        },[])
    const [remove,setRemove] = useState(false)
    const [id,setId] = useState(null)
    const {habits} = useSelector(state=> state.data)

     const listItems = habits && habits.map(item=> <li key={item._id}> 
        <span>{item.habit}</span>
        <button >done</button>
        <button>edit</button>
        <button onClick={()=>{setRemove(true); setId(item._id)}}>delete</button>
    
                                </li>) 
  return (
    <div>
      {remove && <DeleteCard setRemove={setRemove} id={id} ></DeleteCard>}
      <ol>{listItems}</ol>
      </div>
  )
}

export default HabitCard