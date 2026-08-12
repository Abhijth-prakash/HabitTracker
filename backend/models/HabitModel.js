const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  habit: {
    type: String,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

}, { timestamps: true });

module.exports = mongoose.model("Habits", HabitSchema);