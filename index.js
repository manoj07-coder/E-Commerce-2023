import express from 'express'
import dotenv  from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
dotenv.config()

connectDB();

const app = express();

app.use(express.json())
app.use(morgan('dev'))


const port = process.env.PORT

app.get('/',(req,res)=>{
    res.send('<h1>E-commerce application</h1>')
})

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`.bgBlue);
})