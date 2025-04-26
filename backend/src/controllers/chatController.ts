import { Request, Response } from 'express';
import ChatRoom from '../models/ChatRoom';
import Message from '../models/Message';

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const messages = await Message.find({ chatRoom: roomId }).populate('sender', 'username avatar').sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages', details: err });
  }
};

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { name, members, isGroup } = req.body;
    const chatRoom = new ChatRoom({ name, members, isGroup });
    await chatRoom.save();
    res.status(201).json(chatRoom);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create chat room', details: err });
  }
};
