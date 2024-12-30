const express = require('express')

const mongoose = require('mongoose')

const dotenv = require('dotenv')

const cors = require('cors')

dotenv.config();


const app = express()

const PORT = process.env.PORT || 5000


//setting the middlewares

app.use(cors())

app.use(express.json())



//db connection

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("DB Connected Successfully"))
.catch(err => console.log(err))


//routes setting

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/tasks', require('./routes/taskRoutes'))

//listening of the app

app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`))
