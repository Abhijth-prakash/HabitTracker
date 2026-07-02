import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addHabits } from '../redux/features/HabitSlice'
import { useForm } from 'react-hook-form'
import HabitCard from '../components/HabitCard'

const Home = () => {
  const dispatch = useDispatch()
  const {register,handleSubmit,formState} = useForm()
  
const dataHandle = async (data) => {
  try {
    const response = await dispatch(addHabits(data));
    console.log("Success");
  } catch (error) {
    console.log("Failed", error);
  }
};


  return (<>

    <form onSubmit={handleSubmit(dataHandle)}>
        <input type="text" {...register('habit')} placeholder='typesomething' />
        <button>+</button>
    </form>
    <HabitCard></HabitCard>
    </>
  )
}

export default Home