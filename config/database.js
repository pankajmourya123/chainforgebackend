import mongoose from "mongoose";
dotenv.config({ path: "./config/config.env" });
import dotenv from "dotenv";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "chainforge",
    }).then(() => {
        console.log("MongoDB connected");
    }).catch((err) => {
        console.log(`MongoDB connection error: ${err.message}`);
    });
};
