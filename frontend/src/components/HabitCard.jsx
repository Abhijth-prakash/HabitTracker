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
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
        <p className="text-gray-500 text-lg">No habits yet. Add one!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {remove && <DeleteCard setRemove={setRemove} id={id} />}

      <h2 className="text-2xl font-bold mb-6 text-slate-800">All Habits</h2>

      <ol className="space-y-4">
        {habits.map((item) => (
          <li
            key={item._id}
            className="flex items-center justify-between border border-gray-200 rounded-xl p-4 hover:shadow-md transition duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-700">
              {item.habit}
            </h3>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handlingDone(item._id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
              >
                Done
              </button>

              <Link to={`/habit/${item._id}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
                  Edit
                </button>
              </Link>

              <button
                onClick={() => {
                  setRemove(true);
                  setId(item._id);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default HabitCard;
