const express = require('express')
const app = express()
const db = require('./config/db')
const Habits = require('./models/HabitModel')

db.connect()

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('this is my server')
})
app.post('/', async (req,res)=>{
    const {habit} = req.body
    const newHabit = new Habits({
        habit: habit
    })

    await newHabit.save()
    res.status(201).json(newHabit);
})

app.listen(8888, () => {
    console.log('Server is running on http://localhost:8888')
})