import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Schema from "../schema/HabitSchema"
import { getHabits, getLogs, getWeeklogs, updateHabits } from "../redux/features/HabitSlice"
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
            await dispatch(getLogs())
            await dispatch(getWeeklogs())
            navigate('/')
        }
    }

    return (
        <div className="min-h-screen bg-[#09090F] flex items-center justify-center px-4 py-12 text-white relative z-10">
            <div className="w-full max-w-md glass-card border border-white/[0.08] shadow-[0_0_50px_rgba(0,0,0,0.6)] p-8 rounded-[24px]">
                <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#A855F7] flex items-center justify-center text-xl mx-auto mb-3">
                        ✏️
                    </div>
                    <h1 className="text-2xl font-bold text-white">
                        Edit Habit
                    </h1>
                    <p className="text-[#A1A1AA] text-sm mt-1">
                        Update your habit title and preferences
                    </p>
                </div>

                <form onSubmit={handleSubmit(dataHandle)} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-2 ml-1">
                            Habit Name
                        </label>
                        <input
                            type="text"
                            {...register('habit')}
                            className="w-full bg-[#11111A] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 transition duration-200"
                        />
                        {errors?.habit?.message && (
                            <p className="text-rose-400 text-sm mt-2 ml-1 flex items-center gap-1 font-medium">
                                ⚠️ {errors.habit.message}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            className="flex-1 purple-primary-btn px-5 py-3 rounded-xl font-semibold text-white cursor-pointer transition flex items-center justify-center gap-2"
                        >
                            Update Habit
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="flex-1 px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white/90 border border-white/[0.1] font-semibold transition cursor-pointer"
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