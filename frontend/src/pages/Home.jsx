import { useDispatch } from "react-redux";
import { addHabits } from "../redux/features/HabitSlice";
import { useForm } from "react-hook-form";
import HabitCard from "../components/HabitCard";
import { zodResolver } from "@hookform/resolvers/zod";
import Schema from "../schema/HabitSchema";
import TodayCard from "../components/TodayCard";
import WeeklyCard from "../components/WeeklyCard";

const Home = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(Schema),
  });

  const dataHandle = async (data) => {
    try {
      await dispatch(addHabits(data));
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-800">
          Habit Tracker
        </h1>

        <form
          onSubmit={handleSubmit(dataHandle)}
          className="bg-white shadow-lg rounded-2xl p-5 flex gap-4 mb-8"
        >
          <div className="flex-1">
            <input
              {...register("habit")}
              type="text"
              placeholder="Enter a habit..."
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors?.habit && (
              <p className="text-red-500 text-sm mt-1">
                {errors.habit.message}
              </p>
            )}
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-lg font-semibold transition"
            type="submit"
          >
            Add
          </button>
        </form>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <HabitCard />
          </div>

          <div>
            <TodayCard />
          </div>
          <div>
            <WeeklyCard></WeeklyCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;