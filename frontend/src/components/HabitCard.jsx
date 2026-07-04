import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHabits } from '../redux/features/HabitSlice'
import DeleteCard from './DeleteCard'
import { Link } from 'react-router-dom'

const HabitCard = () => {

      const dispatch = useDispatch()
          useEffect(()=>{
          dispatch(getHabits())
        
        },[dispatch])
    const [remove,setRemove] = useState(false)
    const [id,setId] = useState(null)
    const {habits} = useSelector(state=> state.data)
     if (!habits?.length) return <p>No habits yet. Add one!</p>
     const listItems = habits && habits.map(item=> <li key={item._id}> 
        <span>{item.habit}</span>
        <button >done</button>
        <Link to={`/habit/${item._id}`}>
        <button>edit</button>
        </Link>
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