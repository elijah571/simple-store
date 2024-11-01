import mongoose from "mongoose";
import dotenv from "dotenv"; // Ensure dotenv is imported

dotenv.config(); 
export const connectDB = async () => {
    try {
       
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected successfully to ${connect.connection.host}`);
    } catch (error) {
        console.error('Failed to connect to database:', error.message);
        process.exit(1);
    }
};
