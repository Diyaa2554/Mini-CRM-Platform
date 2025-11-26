import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(e){
        console.error(`Error: ${e}`);
        process.exit(1);
    }
}

export default connectDB;