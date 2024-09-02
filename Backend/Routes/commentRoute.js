import   express from 'express';
import { verifyToken } from "../middleware/auth";
import { createComment } from "../controllers/comment";
import { getPostComments } from '../controllers/comment';
const router = express.Router();

router.get('/')
router.post('/:postId/create',verifyToken,createComment);
router.get('/:postId',verifyToken,getPostComments)
export default router;


