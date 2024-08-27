import express from "express";

import {
    cratePost
} from "../controllers/post.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

