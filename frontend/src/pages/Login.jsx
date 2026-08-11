import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Loginuser } from '../redux/features/UserSlice'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const datahandle = async (data) => {
    const result = await dispatch(Loginuser(data))
    if (!result.error) {
      navigate('/home')
    }
  }

  const { error } = useSelector(state => state.userData)

  return (
    <div className="min-h-screen bg-[#09090F] flex items-center justify-center py-10 px-4 sm:px-6 text-white relative z-10">
      <div className="w-full max-w-md space-y-8">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#A855F7] text-[11px] font-semibold tracking-wider uppercase">
            <span>⚡</span>
            <span>Welcome Back</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#A855F7] leading-tight">
            Login
          </h1>
          <p className="text-[#A1A1AA] text-sm leading-relaxed">
            Sign in to continue tracking your habits.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit(datahandle)}
          className="glass-card p-6 sm:p-7 border border-white/[0.08] rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-[#7C3AED]/30 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)] space-y-4"
        >
          {/* Email */}
          <div>
            <input
              type="email"
              {...register('email')}
              placeholder="email"
              className="w-full h-12 bg-[#11111A] border border-white/[0.1] rounded-xl px-4 text-sm text-white placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 transition-all duration-200 hover:border-white/[0.18]"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              {...register('password')}
              placeholder="password"
              className="w-full h-12 bg-[#11111A] border border-white/[0.1] rounded-xl px-4 text-sm text-white placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 transition-all duration-200 hover:border-white/[0.18]"
            />
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
          Don't have an account?{' '}
          <Link to={'/user/register'} className="text-[#A855F7] hover:underline font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login