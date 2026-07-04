import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"


const Edit = () => {
    const {id} = useParams()
    const {register,handleSubmit} = useForm()
    const dispatch =  useDispatch()
    const navigate = useNavigate()
    const dataHandle = async(data)=>{
        const result = await dispatch()
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