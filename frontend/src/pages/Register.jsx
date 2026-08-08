import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Adduser } from '../redux/features/UserSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../schema/userSchema'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user,error} = useSelector(state=> state.userData)
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(registerSchema)
  })
  const { errors } = formState

  const dataHandle = async (data) => {
    const result = await dispatch(Adduser(data))
    if (!result.error) {
      console.log('pass')
      navigate('/user/login')
    }else{

    }
  }



  return (
    <div className="min-h-screen bg-[#09090F] flex items-center justify-center py-10 px-4 sm:px-6 text-white relative z-10">
      <div className="w-full max-w-md space-y-8">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#A855F7] text-[11px] font-semibold tracking-wider uppercase">
            <span>⚡</span>
            <span>Create Account</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#A855F7] leading-tight">
            Register
          </h1>
          <p className="text-[#A1A1AA] text-sm leading-relaxed">
            Join and start tracking your habits today.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit(dataHandle)}
          className="glass-card p-6 sm:p-7 border border-white/[0.08] rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-[#7C3AED]/30 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)] space-y-4"
        >
          {/* Name */}
          <div>
            <input
              type="text"
              {...register('name')}
              placeholder="name"
              className="w-full h-12 bg-[#11111A] border border-white/[0.1] rounded-xl px-4 text-sm text-white placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 transition-all duration-200 hover:border-white/[0.18]"
            />
            {errors.name && (
              <p className="text-rose-400 text-xs mt-2 ml-1 flex items-center gap-1.5 font-medium">
                <span>⚠️</span>
                <span>{errors.name.message}</span>
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              {...register('email')}
              placeholder="email"
              className="w-full h-12 bg-[#11111A] border border-white/[0.1] rounded-xl px-4 text-sm text-white placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 transition-all duration-200 hover:border-white/[0.18]"
            />
            {errors.email && (
              <p className="text-rose-400 text-xs mt-2 ml-1 flex items-center gap-1.5 font-medium">
                <span>⚠️</span>
                <span>{errors.email.message}</span>
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              {...register('password')}
              placeholder="password"
              className="w-full h-12 bg-[#11111A] border border-white/[0.1] rounded-xl px-4 text-sm text-white placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 transition-all duration-200 hover:border-white/[0.18]"
            />
            {errors.password && (
              <p className="text-rose-400 text-xs mt-2 ml-1 flex items-center gap-1.5 font-medium">
                <span>⚠️</span>
                <span>{errors.password.message}</span>
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              {...register('confirmPassword')}
              placeholder="confirm password"
              className="w-full h-12 bg-[#11111A] border border-white/[0.1] rounded-xl px-4 text-sm text-white placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 transition-all duration-200 hover:border-white/[0.18]"
            />
            {errors.confirmPassword && (
              <p className="text-rose-400 text-xs mt-2 ml-1 flex items-center gap-1.5 font-medium">
                <span>⚠️</span>
                <span>{errors.confirmPassword.message}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="purple-primary-btn w-full h-12 rounded-xl font-semibold text-sm text-white cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            Submit
          </button>
        </form>
            {error && (
  <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
    <span>⚠️</span>
    <span>{error.message}</span>
  </div>
)}
        <p className="text-center text-sm text-[#A1A1AA]">
          <Link to={'/'} className="text-[#A855F7] hover:underline font-medium">
            ← Back to login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register