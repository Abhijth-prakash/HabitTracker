import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Schema from "../schema/HabitSchema"
import { getHabits, updateHabits } from "../redux/features/HabitSlice"
import { useEffect } from "react"


const Edit = () => {
    const dispatch =  useDispatch()

    useEffect(()=>{
        dispatch(getHabits())
    },[dispatch])

    const {id} = useParams()
const {habits} = useSelector(state=> state.data) 
const habit = habits?.find(item => item._id == id)

const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
        habit: habit?.habit
    }
})

    const navigate = useNavigate()

    const dataHandle = async(data)=>{
        const newdata ={
            id:id,
            habit: data.habit
        }
        const result = await dispatch(updateHabits(newdata))
        if(!result.error){
            navigate('/')
        }
    }
  return (
    <>
    <form onSubmit={handleSubmit(dataHandle)} > 
        <input type="text" {...register('habit')} />
        <button>update</button>
        </form>    
    </>
  )
}

export default Edit