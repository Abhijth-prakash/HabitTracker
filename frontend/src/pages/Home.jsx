import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addHabits, getHabits } from '../redux/features/HabitSlice'
import { useForm } from 'react-hook-form'

const Home = () => {
  const dispatch = useDispatch()


      useEffect(()=>{
      dispatch(getHabits())
    },[])

  const {register,handleSubmit,formState} = useForm()
  
const dataHandle = async (data) => {
  try {
    const response = await dispatch(addHabits(data)).unwrap();
    console.log("Success", response);
  } catch (error) {
    console.log("Failed", error);
  }
};


  return (

    <form onSubmit={handleSubmit(dataHandle)}>
        <input type="text" {...register('habit')} placeholder='typesomething' />
        <button>+</button>
    </form>
  )
}

export default Home