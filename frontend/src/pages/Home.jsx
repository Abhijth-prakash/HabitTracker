import { useDispatch } from 'react-redux'
import { addHabits } from '../redux/features/HabitSlice'
import { useForm } from 'react-hook-form'
import HabitCard from '../components/HabitCard'
import { zodResolver } from '@hookform/resolvers/zod'
import Schema from '../schema/HabitSchema'

const Home = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(Schema)
  })

  const { errors } = formState

  const dataHandle = async (data) => {
    try {
      await dispatch(addHabits(data))
      reset()
      console.log("Success")
    } catch (error) {
      console.log("Failed", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Habit Tracker
        </h1>

        <form
          onSubmit={handleSubmit(dataHandle)}
          className="flex items-start gap-3 bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6"
        >
          <div className="flex-1">
            <input
              type="text"
              {...register('habit')}
              placeholder="Type something..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            {errors?.habit?.message && (
              <p className="text-red-500 text-sm mt-1 ml-1">{errors.habit.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 transition-colors"
          >
            +
          </button>
        </form>

        <HabitCard />
      </div>
    </div>
  )
}

export default Home