import express from "express";

import {
    cratePost,
    getFeedPosts,
    getSinglePost
} from "../controllers/post.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.use("/",verifyToken,getFeedPosts);

router.use("/:id",verifyToken,getSinglePost);

export default router;