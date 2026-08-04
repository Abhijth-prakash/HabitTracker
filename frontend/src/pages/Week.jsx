import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeeklogs } from "../redux/features/HabitSlice";

const Week = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeeklogs());
  }, [dispatch]);

  const { weeklogs, weekdates } = useSelector((state) => state.data);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 px-6 py-5">
          <h1 className="text-3xl font-bold text-white">
            Weekly Habit Report
          </h1>
          <p className="text-indigo-100 mt-1">
            Track your weekly habit progress
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Table Head */}
            <thead className="sticky top-0 bg-slate-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-base font-semibold">
                  Habit
                </th>

                {weekdates &&
                  weekdates.map((date) => {
                    const d = new Date(date);

                    return (
                      <th
                        key={date}
                        className="px-4 py-4 text-center min-w-[90px]"
                      >
                        <div className="flex flex-col items-center">
                          <span className="text-xs uppercase tracking-wide text-slate-300">
                            {d.toLocaleDateString("en-IN", {
                              weekday: "short",
                            })}
                          </span>

                          <span className="mt-1 text-sm font-semibold">
                            {d.toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>
                      </th>
                    );
                  })}

                <th className="px-6 py-4 text-center text-base font-semibold">
                  Progress
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {weeklogs &&
                weeklogs.map((habit, rowIndex) => (
                  <tr
                    key={habit.habitId}
                    className={`transition hover:bg-indigo-50 ${
                      rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50"
                    }`}
                  >
                    {/* Habit Name */}
                    <td className="px-6 py-5 font-semibold text-gray-800 border-b">
                      {habit.habit}
                    </td>

                    {/* Daily Status */}
                    {habit.week.map((status, index) => (
                      <td
                        key={index}
                        className="border-b text-center py-5"
                      >
                        {status ? (
                          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold">
                            ✓
                          </div>
                        ) : (
                          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-500 font-bold">
                            ✕
                          </div>
                        )}
                      </td>
                    ))}

                    {/* Percentage */}
                    <td className="border-b text-center">
                      <span
                        className={`inline-block rounded-full px-4 py-2 font-semibold ${
                          habit.percentage >= 80
                            ? "bg-green-100 text-green-700"
                            : habit.percentage >= 50
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
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
                    className="py-10 text-center text-gray-500"
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
  );
};

export default Week;