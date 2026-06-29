const express = require('express')
const app = express()
const db = require('./config/db')
const Habits = require('./models/HabitModel')
const habitController = require('./controllers/Habitcontroller')

db.connect()

app.use(express.json());

app.get('/',habitController.getHabits)
app.post('/',habitController.addHabits)


app.listen(8888, () => {
    console.log('Server is running on http://localhost:8888')
})