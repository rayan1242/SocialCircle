import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config({
    path: 'C:/Users/Rayyan/developer/SocialCircle/Backend/.env'
});

const URL = process.env.MONGO_DB_URL; // Ensure this matches the key in your .env file
if (!URL) {
    throw new Error('MONGO_DB_URL is not defined in environment variables');
}

const connect = async () => {
    try {
        // Connect to MongoDB without deprecated options
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

export default connect;
