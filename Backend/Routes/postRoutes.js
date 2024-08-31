import express from "express";

import {
    cratePost,
    getFeedPosts,
    getSinglePost,
    getUserPosts,
    likePosts,
    deletePost
} from "../controllers/post.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/status/:postId", verifyToken,getSinglePost);

router.patch("/:id/like", verifyToken, likePosts);
router.delete("/:id",verifyToken,deletePost);

export default router;

