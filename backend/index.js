const express = require('express')
const app = express()
const db = require('./config/db')
const Habits = require('./models/HabitModel')
const habitController = require('./controllers/Habitcontroller')
const cors = require('cors')

db.connect()

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173'
}))

//habits
app.get('/habits',habitController.getHabits)
app.post('/habits',habitController.addHabits)
app.delete('/habits/:id',habitController.deleteHabits)
app.patch('/habits/:id',habitController.updateHabits)


//habitlogs
app.post('/habits/logs',habitController.habitLogss)
app.get('/habits/logs',habitController.todayHabits)


app.listen(8888, () => {
    console.log('Server is running on http://localhost:8888')
})