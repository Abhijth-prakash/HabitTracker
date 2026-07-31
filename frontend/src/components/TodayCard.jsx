import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogs } from "../redux/features/HabitSlice";

const TodayCard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLogs());
  }, [dispatch]);

  const { logs } = useSelector((state) => state.data);

  return (
    <div>
      <ol>
        {logs?.map((item) => (
          <li key={item._id}>
            <span>{item.habit}</span>
            <span>{item.completed ? " ✅ Completed" : " ⭕ Pending"}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TodayCard;