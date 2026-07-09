import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteHabits } from '../redux/features/HabitSlice'

const DeleteCard = ({ setRemove, id }) => {
    const dispatch = useDispatch()

    const deleteHandle = async () => {
        const result = await dispatch(deleteHabits(id))
        if (!result.error) {
            setRemove(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
                <p className="text-gray-800 text-lg font-medium mb-6">
                    Do you wanna delete this habit?
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={deleteHandle}
                        className="px-5 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => setRemove(false)}
                        className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteCard