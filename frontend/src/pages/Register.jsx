import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Adduser } from '../redux/features/UserSlice'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate

  const {register,handleSubmit} = useForm()

    const dataHandle = async (data)=>{
       const result  = await dispatch(Adduser(data))
       if(!result.error){
        console.log('pass')
        navigate('/user/login')
       }
  }
  return (
    <div><h1>this is register page</h1>
    <Link to={'/home'}>Home</Link>


    <form onSubmit={handleSubmit(dataHandle)} >
      <input type="text" {...register('name')} placeholder='name' />
      <input type="email" {...register('email')} placeholder='email' />
      <input type="password" {...register('password')} placeholder='password' />
      <input type="password"  placeholder=' confirm password' />
      <button>submit</button>
    </form>
    </div>
  )
}

export default Register