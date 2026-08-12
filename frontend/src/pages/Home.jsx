import { useDispatch, useSelector } from "react-redux";
import { addHabits, getLogs, getWeeklogs } from "../redux/features/HabitSlice";
import { useForm } from "react-hook-form";
import HabitCard from "../components/HabitCard";
import { zodResolver } from "@hookform/resolvers/zod";
import Schema from "../schema/HabitSchema";
import TodayCard from "../components/TodayCard";
import WeeklyCard from "../components/WeeklyCard";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, userProfile } from "../redux/features/UserSlice";
import { useEffect, useState } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()


  useEffect(()=>{
    dispatch(userProfile())
  },[dispatch])
  const {user} = useSelector(state=> state.userData)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(Schema),
  });

  const [input,setInput] = useState("")

  const dataHandle = async (data) => {
    try {
      await dispatch(addHabits(data));
      await dispatch(getWeeklogs());
      await dispatch(getLogs());
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handlingLgout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-[#09090F] py-10 sm:py-14 px-4 sm:px-6 lg:px-10 text-white relative z-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-white/[0.06]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#A855F7] text-[11px] font-semibold tracking-wider uppercase">
              <span>⚡</span>
              <span>SaaS Habit Dashboard</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#A855F7] leading-tight">
              Habit Tracker
            </h1>
            <p className="text-[#A1A1AA] text-sm sm:text-base max-w-lg leading-relaxed">
              Build consistency, track daily progress, and analyze weekly performance.
            </p>
          </div>

          {/* User Info + Search + Logout */}
          <div className="flex items-center gap-3">
            {user && (
              <div className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#11111A] border border-white/[0.08]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#A855F7] flex items-center justify-center text-xs font-bold uppercase shrink-0">
                  {user.name?.charAt(0)}
                </div>
                <span className="text-sm font-medium text-white/90 truncate max-w-[140px]">
                  {user.name}
                </span>
              </div>
            )}

            <button
              onClick={() => handlingLgout()}
              className="h-11 px-5 rounded-xl font-semibold text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:bg-rose-500/20 hover:border-rose-500/30 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Command Bar: Add Habit Form */}
        <form
          onSubmit={handleSubmit(dataHandle)}
          className="glass-card p-5 sm:p-6 border border-white/[0.08] rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-[#7C3AED]/30 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]"
        >
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <div className="flex-1 relative">
              <input
                {...register("habit")}
                type="text"
                placeholder="What habit are you building today? (e.g. Read 20 mins, Workout, Meditate)..."
                className="w-full h-12 bg-[#11111A] border border-white/[0.1] rounded-xl px-4 text-sm text-white placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 transition-all duration-200 hover:border-white/[0.18]"
              />

              {errors?.habit && (
                <p className="text-rose-400 text-xs mt-2 ml-1 flex items-center gap-1.5 font-medium animate-in fade-in slide-in-from-top-1 duration-200">
                  <span>⚠️</span>
                  <span>{errors.habit.message}</span>
                </p>
              )}
            </div>

            <button
              className="purple-primary-btn h-12 px-6 rounded-xl font-semibold text-sm text-white cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap shrink-0 hover:scale-[1.03] active:scale-[0.98]"
              type="submit"
            >
              <span className="text-base leading-none">+</span>
              <span>Add Habit</span>
            </button>
          </div>
        </form>

        {/* 12-Column Dashboard Grid: 7 Cols (Habits List) | 5 Cols (Analytics Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div className="glass-card p-4 sm:p-5 border border-white/[0.08] rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-white/80 tracking-wide uppercase">
                  Your Habits
                </h2>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A1AA]/60 text-base pointer-events-none">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search your habits..."
                  value={input}
                  onChange={(e)=> setInput(e.target.value)}
                  className="w-full h-12 bg-[#11111A] border border-white/[0.1] rounded-xl pl-11 pr-4 text-sm text-white placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 transition-all duration-200 hover:border-white/[0.18]"
                />
              </div>
            </div>

            <HabitCard input={input} />

            <Link
              to="/habit/weeklyreport"
              className="group w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#A855F7] px-6 py-4 text-white font-semibold shadow-[0_0_25px_rgba(124,58,237,0.4)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(124,58,237,0.6)] hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
            >
              <span>📊 View Full Weekly Matrix Report</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <TodayCard />
            <WeeklyCard />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;