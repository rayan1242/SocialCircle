import   express from 'express';
import { verifyToken } from "../middleware/auth";
import { createComment, likeComment, updateComment } from "../controllers/comment";
import { getPostComments } from '../controllers/comment';
const router = express.Router();

router.get('/')
router.post('/:postId/create',verifyToken,createComment);
router.get('/:postId',verifyToken,getPostComments);


router.patch('/:commentId/like',verifyToken,likeComment);
router.patch('/:commentId/update',verifyToken,updateComment);

export default router;
