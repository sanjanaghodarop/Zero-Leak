import express from 'express';
import { getMessages, createRoom } from '../controllers/chatController';
const router = express.Router();

router.get('/messages/:roomId', getMessages);
router.post('/room', createRoom);

export default router;
