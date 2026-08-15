import React from 'react'

const Loading = () => {
  return (
     <div className="min-h-screen bg-[#09090F] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />

        <p className="text-gray-400 text-sm">
          Loading HabitTracker...
        </p>
      </div>
    </div>
  )
}

export default Loading