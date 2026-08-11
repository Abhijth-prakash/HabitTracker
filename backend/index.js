const express = require('express')
const app = express()
const db = require('./config/db')
const Habits = require('./models/HabitModel')
const habitController = require('./controllers/Habitcontroller')
const userController = require('./controllers/Usercontroller')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const verifyToken = require('./middilewares/auth')

db.connect()

app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true  
}))

//habits
app.get('/habits',verifyToken,habitController.getHabits)
app.post('/habits',verifyToken,habitController.addHabits)
app.delete('/habits/:id',verifyToken,habitController.deleteHabits)
app.patch('/habits/:id',verifyToken,habitController.updateHabits)


//habitlogs
app.post('/habits/logs',verifyToken,habitController.habitLogss)
app.get('/habits/logs',verifyToken,habitController.todayHabits)
app.get('/habits/weeklogs',verifyToken,habitController.weekHabits)

//users
app.post('/user/registration',userController.register)
app.post('/user/login',userController.login)


app.listen(8888, () => {
    console.log('Server is running on http://localhost:8888')
})