const Habits = require('../models/HabitModel')


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


module.exports={
    getHabits,
    addHabits,
    deleteHabits,
    updateHabits
}