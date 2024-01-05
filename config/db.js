import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to MongoDB ${conn.connection.host}`.bgGreen.white);
    } catch (error) {
        console.log(`Error in the Database ${error}`.bgRed.white);
    }
}

export default connectDB;