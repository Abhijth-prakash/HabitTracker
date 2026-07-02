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

app.get('/habits',habitController.getHabits)
app.post('/habits',habitController.addHabits)
app.delete('/habits',habitController.deleteHabits)


app.listen(8888, () => {
    console.log('Server is running on http://localhost:8888')
})