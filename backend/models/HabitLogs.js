const mongoose = require("mongoose");

const HabitLogSchema = new mongoose.Schema({
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Habits",
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  completed: {
    type: Boolean,
    default: true,
  }

}, { timestamps: true });

module.exports = mongoose.model("HabitLogs", HabitLogSchema);