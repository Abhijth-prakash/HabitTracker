import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeeklogs } from "../redux/features/HabitSlice";

const WeeklyCard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeeklogs());
  }, [dispatch]);

  const { weeklogs } = useSelector((state) => state.data);

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Weekly Report
      </h1>

      <div className="space-y-4">
        {weeklogs &&
          weeklogs.map((habit) => (
            <div
              key={habit.habitId}
              className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center hover:shadow-lg transition duration-300"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {habit.habit}
                </h2>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">
                  {habit.percentage}%
                </p>
                <p className="text-sm text-gray-500">
                  Weekly Completion
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WeeklyCard;