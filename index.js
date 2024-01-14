import express from 'express'
import dotenv  from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes  from './routes/authRoutes.js'

dotenv.config()

connectDB();

const app = express();

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth',authRoutes)

const port = process.env.PORT

app.get('/',(req,res)=>{
    res.send('<h1>E-commerce application</h1>')
})

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`.bgBlue);
})

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})