import { useDispatch } from "react-redux";
import { deleteHabits, getHabits, getLogs, getWeeklogs } from "../redux/features/HabitSlice";

const DeleteCard = ({ setRemove, id }) => {
  const dispatch = useDispatch();

  const deleteHandle = async () => {
    const result = await dispatch(deleteHabits(id));

    if (!result.error) {
      await dispatch(getHabits());
      await dispatch(getLogs());
      await dispatch(getWeeklogs())

      setRemove(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#11111A] border border-white/[0.1] rounded-[24px] shadow-[0_0_50px_rgba(0,0,0,0.8)] p-6 max-w-sm w-full text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center text-xl mx-auto shadow-[0_0_20px_rgba(239,68,68,0.3)]">
          ⚠️
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-1">Delete Habit?</h3>
          <p className="text-[#A1A1AA] text-sm">
            Are you sure you want to delete this habit? This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={deleteHandle}
            className="flex-1 px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold shadow-[0_0_15px_rgba(239,68,68,0.4)] transition cursor-pointer"
          >
            Yes, Delete
          </button>

          <button
            onClick={() => setRemove(false)}
            className="flex-1 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white/90 border border-white/[0.1] font-semibold transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCard;