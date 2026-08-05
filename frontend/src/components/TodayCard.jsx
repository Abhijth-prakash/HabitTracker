import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogs } from "../redux/features/HabitSlice";
import { Link } from "react-router-dom";

const TodayCard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLogs());
  }, [dispatch]);

  const { logs } = useSelector((state) => state.data);

  const completed = logs?.filter((item) => item.completed).length || 0;
  const total = logs?.length || 0;

  return (
    <div className="glass-card p-6 border border-white/[0.08] shadow-[0_0_30px_rgba(0,0,0,0.4)] sticky top-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#7C3AED]/15 border border-[#7C3AED]/30 flex items-center justify-center text-xs">
            📅
          </span>
          Today's Progress
        </h2>
        <Link 
          to="/habit/weeklyreport"
          className="text-xs font-bold text-[#A855F7] hover:text-white px-2 py-0.5 rounded-lg bg-[#7C3AED]/10 hover:bg-[#7C3AED] transition cursor-pointer"
          title="Click to view weekly report"
        >
          {total ? Math.round((completed / total) * 100) : 0}% ↗
        </Link>
      </div>

      <Link
        to="/habit/weeklyreport"
        className="block space-y-2 group cursor-pointer rounded-xl p-2 -mx-2 hover:bg-white/[0.03] transition border border-transparent hover:border-white/[0.06]"
        title="Click to view full weekly report"
      >
        <div className="flex justify-between text-xs text-[#A1A1AA] font-medium group-hover:text-white transition">
          <span>Completion rate (click for report)</span>
          <span className="text-white font-semibold">
            {completed} of {total} habits
          </span>
        </div>

        <div className="w-full h-3.5 bg-white/[0.08] rounded-full p-0.5 overflow-hidden border border-white/[0.05] group-hover:border-[#7C3AED]/40 transition">
          <div
            className="h-full bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(124,58,237,0.5)] group-hover:brightness-110"
            style={{
              width: `${total ? (completed / total) * 100 : 0}%`,
            }}
          ></div>
        </div>
      </Link>

      <ol className="space-y-2.5 pt-2">
        {logs?.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center py-2 px-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] transition"
          >
            <span className="text-sm font-medium text-white/90 truncate max-w-[160px]">
              {item.habit}
            </span>

            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border ${
                item.completed
                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                  : "bg-amber-500/15 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
              }`}
            >
              {item.completed ? "✓ Done" : "⏳ Pending"}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TodayCard;