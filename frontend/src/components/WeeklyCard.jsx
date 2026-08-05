import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeeklogs } from "../redux/features/HabitSlice";
import { Link } from "react-router-dom";

const WeeklyCard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeeklogs());
  }, [dispatch]);

  const { weeklogs } = useSelector((state) => state.data);

  return (
    <div className="glass-card p-6 border border-white/[0.08] shadow-[0_0_30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#7C3AED]/15 border border-[#7C3AED]/30 flex items-center justify-center text-xs">
            📈
          </span>
          Weekly Completion
        </h2>
        <Link
          to="/habit/weeklyreport"
          className="text-xs font-semibold text-[#A855F7] hover:text-white transition"
        >
          View Matrix →
        </Link>
      </div>

      <div className="space-y-3">
        {weeklogs &&
          weeklogs.map((habit) => (
            <Link
              key={habit.habitId}
              to="/habit/weeklyreport"
              className="block bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-[#7C3AED]/30 rounded-2xl p-4 transition duration-300 shadow-sm cursor-pointer group"
              title="Click to view full weekly report"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-[#E0E7FF] transition">
                    {habit.habit}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    7-day completion metric
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#A855F7] group-hover:scale-105 transition transform">
                    {habit.percentage}%
                  </p>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#A1A1AA]">
                    Performance
                  </span>
                </div>
              </div>
            </Link>
          ))}

        {(!weeklogs || weeklogs.length === 0) && (
          <div className="text-center py-6 text-sm text-[#A1A1AA]">
            No weekly stats available yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyCard;