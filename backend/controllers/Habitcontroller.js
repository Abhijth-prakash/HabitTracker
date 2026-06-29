
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
        return res.status(201).json({message:"habit saved successfully"})

    }catch(error){
        console.log(error)
        return res.status(500).json({message:"server error"})
    }
}

module.exports={
    getHabits,
    addHabits
}