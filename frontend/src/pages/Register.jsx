import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Register = () => {

  const {register,handleSubmit} = useForm()

    const dataHandle = (data)=>{
      
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