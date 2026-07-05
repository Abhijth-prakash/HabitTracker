import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Schema from "../schema/HabitSchema"


const Edit = () => {
    const {habits} = useSelector(state=> state.data) 
    const {id} = useParams()
const habit = habits.find(item => item._id == id)

const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
        habit: habit?.habit
    }
})
    const dispatch =  useDispatch()
    const navigate = useNavigate()
    const dataHandle = async(data)=>{
        const newdata ={
            id:id,
            habit: data
        }
        const result = await dispatch(newdata)
        if(!result.error){
            navigate('/')
        }
    }
  return (
    <>
    <form onSubmit={handleSubmit(dataHandle)} > 
        <input type="text" {...register('habit')} />
        </form>    
    </>
  )
}

export default Edit