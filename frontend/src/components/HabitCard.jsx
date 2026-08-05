import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddingLog,
  getHabits,
  getLogs,
  getWeeklogs,
} from "../redux/features/HabitSlice";
import DeleteCard from "./DeleteCard";
import { Link } from "react-router-dom";

const HabitCard = () => {
  const dispatch = useDispatch();

  const [remove, setRemove] = useState(false);
  const [id, setId] = useState(null);

  const { habits } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getHabits());
    dispatch(getLogs());
  }, [dispatch]);

  const handlingDone = async (id) => {
    try {
      await dispatch(AddingLog(id));

      // Refresh the data
      await dispatch(getHabits());
      await dispatch(getLogs());
      await dispatch(getWeeklogs());
    } catch (error) {
      console.log(error);
    }
  };

  if (!habits?.length) {
    return (
      <div className="glass-card p-12 text-center border border-white/[0.08] shadow-[0_0_30px_rgba(0,0,0,0.4)]">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center text-2xl">
          ✨
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No habits tracked yet</h3>
        <p className="text-[#A1A1AA] text-sm max-w-sm mx-auto">
          Start by adding your first daily habit above to track consistency and unlock weekly analytics.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 border border-white/[0.08] shadow-[0_0_30px_rgba(0,0,0,0.4)]">
      {remove && <DeleteCard setRemove={setRemove} id={id} />}

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
        <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-[#7C3AED]/15 border border-[#7C3AED]/30 flex items-center justify-center text-sm">
            ⚡
          </span>
          All Habits
        </h2>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/[0.06] text-[#A1A1AA] border border-white/[0.08]">
          {habits.length} {habits.length === 1 ? 'Habit' : 'Habits'}
        </span>
      </div>

      <ol className="space-y-3">
        {habits.map((item) => (
          <li
            key={item._id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[#7C3AED]/30 rounded-2xl p-4 sm:px-5 sm:py-3.5 min-h-[64px] transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] group"
          >
            <h3 className="text-base font-semibold text-white tracking-wide group-hover:text-[#E0E7FF] transition leading-snug">
              {item.habit}
            </h3>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handlingDone(item._id)}
                className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-sm hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              >
                <span>✓ Done</span>
              </button>

              <Link to={`/habit/${item._id}`}>
                <button className="bg-[#7C3AED]/15 text-[#A855F7] border border-[#7C3AED]/30 hover:bg-[#7C3AED] hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-sm hover:shadow-[0_0_15px_rgba(124,58,237,0.4)]">
                  <span>✏️ Edit</span>
                </button>
              </Link>

              <button
                onClick={() => {
                  setRemove(true);
                  setId(item._id);
                }}
                className="bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-sm hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
              >
                <span>🗑️ Delete</span>
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default HabitCard;
