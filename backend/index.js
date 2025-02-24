const express = require('express')
require('dotenv').config()
const cors = require('cors');

const authRouter = require('./routes/authRoutes');
const todoRouter = require('./routes/todoRoutes');
const errorHandler = require('./middlewares/errorHandler');
const authMiddleware = require('./middlewares/authMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT;
const app = express()

connectDB();

app.use(cors())
app.use(express.json())

app.use('/api/auth',authRouter)
app.use(authMiddleware)
app.use('/api/todos',todoRouter)
app.use(errorHandler)

app.listen(port,() => console.log(`Todo App is listening on ${port}`))