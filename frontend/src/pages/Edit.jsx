import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Schema from "../schema/HabitSchema"
import { getHabits, updateHabits } from "../redux/features/HabitSlice"
import { useEffect } from "react"

const Edit = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHabits())
    }, [dispatch])

    const { id } = useParams()
    const { habits } = useSelector(state => state.data)
    const habit = habits?.find(item => item._id == id)

    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(Schema),
        defaultValues: {
            habit: habit?.habit
        }
    })

    const { errors } = formState
    const navigate = useNavigate()

    const dataHandle = async (data) => {
        const newdata = {
            id: id,
            habit: data.habit
        }
        const result = await dispatch(updateHabits(newdata))
        if (!result.error) {
            navigate('/')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-5 text-center">
                    Edit Habit
                </h1>

                <form onSubmit={handleSubmit(dataHandle)} className="flex flex-col gap-4">
                    <div>
                        <input
                            type="text"
                            {...register('habit')}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                        {errors?.habit?.message && (
                            <p className="text-red-500 text-sm mt-1 ml-1">{errors.habit.message}</p>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="flex-1 px-5 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="flex-1 px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edit