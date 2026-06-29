const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  habit: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("Habits", HabitSchema);