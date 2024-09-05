import   express from 'express';
import { verifyToken } from "../middleware/auth.js";
import { createComment, deleteComment, likeComment, updateComment } from "../controllers/comment.js";
import { getPostComments } from '../controllers/comment.js';
const router = express.Router();

router.get('/')
router.post('/:postId/create',verifyToken,createComment);
router.get('/:postId',verifyToken,getPostComments);


router.patch('/:postId/like',verifyToken,likeComment);
router.patch('/:commentId/update',verifyToken,updateComment);

router.delete('/:commentId/delete',verifyToken,deleteComment);

export default router;
