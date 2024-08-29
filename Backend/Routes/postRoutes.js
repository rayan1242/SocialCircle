import express from "express";

import {
    cratePost,
    getFeedPosts,
    getSinglePost
} from "../controllers/post.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
//router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/status/:postId", verifyToken,getSinglePost);

export default router;