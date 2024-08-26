import express from 'express'
import {login} from '../controllers/auth.js'
import multer from 'multer'
import Dotenv from 'dotenv'
const router = express.Router();
import {fileURLToPath} from 'url'
router.post("/login",login);
Dotenv.config();

export default router;