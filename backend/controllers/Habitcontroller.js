const Habits = require('../models/HabitModel')
const HabitLog = require('../models/HabitLogs')


//getting data 
const getHabits = async (req,res)=>{
    try{   
        const habits = await Habits.find()
        return res.status(200).json({habits})

    }catch(error){
        return res.status(500).json({message:"server error"})
    }
}

//adding data
const addHabits = async(req,res)=>{
    try{
        const {habit} = req.body
        if(!habit){
            return res.status(400).json({message:"habit is required"})
        }
        const newHabit = new Habits({
            habit:habit
        })  
        await newHabit.save()
        const habits = await Habits.find()
        return res.status(201).json({message:"habit saved successfully",habits})

    }catch(error){
        console.log(error)
        return res.status(500).json({message:"server error"})
    }
}


//deleting habits
const deleteHabits = async (req, res) => {
    try {
        const {id}  = req.params
        if (!id) {
            return res.status(404).json({ message: "habit not found" });
        }

        const deletedHabit = await Habits.findByIdAndDelete(id);

        if (!deletedHabit) {
            return res.status(404).json({ message: "habit not found" });
        }

        const habits = await Habits.find()
        return res.status(200).json({ message: "habit deleted",habits });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
}




//updating habits
const updateHabits = async (req, res) => {
    try {
        const {id}  = req.params
        const {habit} = req.body
        if (!id) {
            return res.status(404).json({ message: "habit not found" });
        }
        if (!habit) {
            return res.status(404).json({ message: "habit not found" });
        }

        const update = await Habits.findByIdAndUpdate(id,{$set:{habit:habit}})
         if (!update) {
            return res.status(404).json({ message: "habit not found" });
        }
        const habits = await Habits.find()
        return res.status(200).json({message:"update completed",habits})

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
}


//habitlogs

const habitLogss = async (req, res) => {
    try {
        const { habitId } = req.body;

        const today = new Date().toISOString().split("T")[0];

        const existing = await HabitLog.findOne({
  habitId,
  date: today,
});

if (existing) {
  return res.json({ message: "Already completed today" });
}

        const log = await HabitLog.create({
            habitId,
            date: today,
            completed: true
        });

        return res.status(201).json(log);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


//getting logs for today

const todayHabits = async (req, res) => {
  try {
    const habits = await Habits.find();
    const today = new Date().toISOString().split("T")[0];

    const todayLogs = await HabitLog.find({
      date: today,
    });

    const result = [];

    for (let i = 0; i < habits.length; i++) {
      let completed = false;

      for (let j = 0; j < todayLogs.length; j++) {
        if (habits[i]._id.toString() === todayLogs[j].habitId.toString()) {
          completed = true;
          break;
        }
      }

      result.push({
        ...habits[i].toObject(),
        completed: completed,
      });
    }
    return res.status(200).json({ message: "success", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
}; 


const weekHabits = async (req, res) => {
  try {
    const today = new Date();

    const dates = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      dates.push(date.toISOString().split("T")[0]);
    }

    const habits = await Habits.find();

    const logs = await HabitLog.find({
      date: { $in: dates }
    });

    // Create lookup
    const logMap = {};

    logs.forEach((log) => {
      const key = `${log.habitId}_${log.date}`;
      logMap[key] = log.completed;
    });

    const weeklyReport = habits.map((habit) => {

      const week = dates.map((date) => {
        const key = `${habit._id}_${date}`;

        return logMap[key] || false;
      });

      const completed = week.filter(Boolean).length;

      return {
        habitId: habit._id,
        habit: habit.habit,
        week,
        percentage: Math.round((completed / 7) * 100)
      };
    });

    return res.json({
      dates,
      weeklyReport
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports={
    getHabits,
    addHabits,
    deleteHabits,
    updateHabits,
    habitLogss,
    todayHabits,
    weekHabits
    
}