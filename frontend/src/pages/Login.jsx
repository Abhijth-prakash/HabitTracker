import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Login = () => {
    const {register,handleSubmit} = useForm()
  return (
    <div>Login

        <form >
            <input type="email" {...register('email')} placeholder='email' />
            <input type="password" {...register('password')} placeholder='password' />
            <button>submit</button>
        </form>
        <Link to={'/user/register'}>Register</Link>
    </div>
  )
}

export default Login