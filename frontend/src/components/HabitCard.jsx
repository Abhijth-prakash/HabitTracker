import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { completedHabits, getHabits } from '../redux/features/HabitSlice'
import DeleteCard from './DeleteCard'
import { Link } from 'react-router-dom'

const HabitCard = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getHabits())
    }, [dispatch])

    const [remove, setRemove] = useState(false)
    const [id, setId] = useState(null)
    const { habits } = useSelector(state => state.data)

    if (!habits?.length) {
        return (
            <p className="text-center text-gray-500 mt-10 text-lg">
                No habits yet. Add one!
            </p>
        )
    }

    const listItems = habits.map(item => (
        <li
            key={item._id}
            className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4 hover:shadow-md transition-shadow"
        >
            <span className="text-gray-800 font-medium">{item.habit}</span>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => dispatch(completedHabits({ id: item._id, completed: true }))}
                    className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-colors"
                >
                    Done
                </button>

                <Link to={`/habit/${item._id}`}>
                    <button className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition-colors">
                        Edit
                    </button>
                </Link>

                <button
                    onClick={() => { setRemove(true); setId(item._id) }}
                    className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                    Delete
                </button>
            </div>
        </li>
    ))

    return (
        <div className="max-w-2xl mx-auto mt-8 px-4">
            {remove && <DeleteCard setRemove={setRemove} id={id} />}
            <ol className="flex flex-col gap-3">{listItems}</ol>
        </div>
    )
}

export default HabitCard