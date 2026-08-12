import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeeklogs } from "../redux/features/HabitSlice";
import { Link } from "react-router-dom";

const Week = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeeklogs());
  }, [dispatch]);

  const { weeklogs, weekdates } = useSelector((state) => state.data);

  return (
    <div className="min-h-screen bg-[#09090F] p-6 lg:p-10 text-white relative z-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-[#A1A1AA] hover:text-white text-sm font-medium transition cursor-pointer"
          >
            <span>← Back to Dashboard</span>
          </Link>
        </div>

        <div className="glass-card rounded-[24px] border border-white/[0.08] shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#7C3AED]/20 via-[#11111A] to-[#A855F7]/10 px-8 py-6 border-b border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/15 border border-[#7C3AED]/30 text-[#A855F7] text-xs font-semibold tracking-wide uppercase mb-2">
                📊 Performance Analytics
              </div>
              <h1 className="text-3xl font-extrabold text-white">
                Weekly Habit Report
              </h1>
              <p className="text-[#A1A1AA] text-sm mt-1">
                Track your weekly consistency and habit completion rate across all 7 days.
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Table Head */}
              <thead className="bg-[#11111A] text-white border-b border-white/[0.08]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-[#A1A1AA]">
                    Habit
                  </th>

                  {weekdates &&
                    weekdates.map((date) => {
                      const d = new Date(date);

                      return (
                        <th
                          key={date}
                          className="px-4 py-4 text-center min-w-[95px]"
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-[11px] uppercase tracking-wider text-[#A855F7] font-semibold">
                              {d.toLocaleDateString("en-IN", {
                                weekday: "short",
                              })}
                            </span>

                            <span className="mt-0.5 text-xs font-medium text-white/80">
                              {d.toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                              })}
                            </span>
                          </div>
                        </th>
                      );
                    })}

                  <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-[#A1A1AA]">
                    Progress
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-white/[0.04]">
                {weeklogs &&
                  weeklogs.map((habit, rowIndex) => (
                    <tr
                      key={habit.habitId}
                      className="transition hover:bg-white/[0.03] bg-[#11111A]/40"
                    >
                      {/* Habit Name */}
                      <td className="px-6 py-5 font-semibold text-white text-base">
                        {habit.habit}
                      </td>

                      {/* Daily Status */}
                      {habit.week.map((status, index) => (
                        <td
                          key={index}
                          className="text-center py-5"
                        >
                          {status ? (
                            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold shadow-[0_0_12px_rgba(34,197,94,0.25)]">
                              ✓
                            </div>
                          ) : (
                            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/20 font-bold">
                              ✕
                            </div>
                          )}
                        </td>
                      ))}

                      {/* Percentage */}
                      <td className="text-center px-6 py-5">
                        <span
                          className={`inline-block rounded-full px-4 py-1.5 text-xs font-bold border shadow-sm ${
                            habit.percentage >= 80
                              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(34,197,94,0.2)]"
                              : habit.percentage >= 50
                              ? "bg-amber-500/15 text-amber-400 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                              : "bg-rose-500/15 text-rose-400 border-rose-500/30 shadow-[0_0_12px_rgba(239,68,68,0.2)]"
                          }`}
                        >
                          {habit.percentage}%
                        </span>
                      </td>
                    </tr>
                  ))}

                {/* Empty State */}
                {weeklogs?.length === 0 && (
                  <tr>
                    <td
                      colSpan={(weekdates?.length || 0) + 2}
                      className="py-12 text-center text-[#A1A1AA] text-sm"
                    >
                      No weekly report available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Week;