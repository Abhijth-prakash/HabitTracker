import { useDispatch } from 'react-redux'
import { addHabits } from '../redux/features/HabitSlice'
import { useForm } from 'react-hook-form'
import HabitCard from '../components/HabitCard'
import { zodResolver } from '@hookform/resolvers/zod'
import Schema from '../schema/HabitSchema'
const Home = () => {
  const dispatch = useDispatch()
  const {register,handleSubmit,formState} = useForm({
    resolver:zodResolver(Schema)
  })

  const { errors } = formState
  
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
        <p>{errors?.habit?.message}</p>
        <button>+</button>
    </form>
    <HabitCard></HabitCard>
    </>
  )
}

export default Home