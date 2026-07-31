import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogs } from "../redux/features/HabitSlice";

const TodayCard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLogs());
  }, [dispatch]);

  const { logs } = useSelector((state) => state.data);

  const completed = logs?.filter((item) => item.completed).length || 0;
  const total = logs?.length || 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
      <h2 className="text-2xl font-bold mb-6">
        Today's Progress
      </h2>

      <p className="text-gray-600 mb-2">
        {completed} of {total} habits completed
      </p>

      <div className="w-full h-3 bg-gray-200 rounded-full mb-6">
        <div
          className="h-3 bg-green-500 rounded-full transition-all duration-500"
          style={{
            width: `${total ? (completed / total) * 100 : 0}%`,
          }}
        ></div>
      </div>

      <ol className="space-y-3">
        {logs?.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center border-b pb-2"
          >
            <span>{item.habit}</span>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                item.completed
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {item.completed ? "Completed" : "Pending"}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TodayCard;