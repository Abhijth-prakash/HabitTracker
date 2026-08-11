import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Loginuser } from '../redux/features/UserSlice'

const Login = () => {
    const {register,handleSubmit} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const datahandle = async (data)=>{
      const result = await dispatch(Loginuser(data))
      if(!result.error){
        navigate('/home')
      }
    }

    const {error} = useSelector(state=> state.userData)
  return (
    <div>Login

        <form onSubmit={handleSubmit(datahandle)}  >
            <input type="email" {...register('email')} placeholder='email' />
            <input type="password" {...register('password')} placeholder='password' />
            <button>submit</button>
            {error&& <p>{error.message}</p>}
        </form>
        <Link to={'/user/register'}>Register</Link>
    </div>
  )
}

export default Login