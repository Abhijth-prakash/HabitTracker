import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getHabits } from '../redux/features/HabitSlice'

const Home = () => {
  const dispatch = useDispatch()
      useEffect(()=>{
      dispatch(getHabits())
    },[])
  return (

    <form >
        <input type="text" placeholder='typesomething' />
        <button>+</button>
    </form>
  )
}

export default Home