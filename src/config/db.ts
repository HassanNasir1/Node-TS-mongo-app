import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB Connected: ${db.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;