import express from 'express';
import dotenv from 'dotenv';
import connect from './db/db.js';
import User from "./models/User.js";
import authRoutes from './Routes/authRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import postRoutes from './Routes/postRoutes.js';
import commentRoutes from './Routes/commentRout.js';
import { register } from './controllers/auth.js';
import { cratePost } from './controllers/post.js';
import { fileURLToPath } from "url";
import multer from "multer";
import { verifyToken } from "./middleware/auth.js";
import path from "path";
import { users,posts } from './data/index.js';
 dotenv.config();

 const app = express();
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables from .env file
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


/*file storage */
const storage = multer.diskStorage({
destination: function(req,file,cb){
    cb(null,"public/assets");
},
filename: function(req,file,cb){
    cb(null,file.originalname);
}
})

const upload = multer({storage});



const PORT = process.env.PORT || 3000; // Set a default port if PORT is not defined

//app.post("/auth/register", register);
app.post("/auth/register", upload.single("image"), register);
//app.post("/posts", verifyToken, cratePost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.listen(PORT, async () => {
    try {       
        //User.insertMany(users);
        //Post.insertMany(posts);
        await connect(); // Call the connect function and await its execution
        console.log(`App is listening on port ${PORT}`);
    } catch (error) {
        // Handle the error here
        console.error('Database connection failed:', error);
    }
});
