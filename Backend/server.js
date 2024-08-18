import express from 'express';
import dotenv from 'dotenv';
import connect from './db/db.js';
import User from "./models/User.js";
// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000; // Set a default port if PORT is not defined

app.listen(PORT, async () => {
    try {
        await connect(); // Call the connect function and await its execution
        console.log(`App is listening on port ${PORT}`);
    } catch (error) {
        // Handle the error here
        console.error('Database connection failed:', error);
    }
});
