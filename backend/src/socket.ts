import { Server } from 'socket.io';
import Message from './models/Message';
import ChatRoom from './models/ChatRoom';
import User from './models/User';

interface IUserSocketMap {
  [userId: string]: string;
}

const userSocketMap: IUserSocketMap = {};

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    socket.on('join', ({ userId, roomId }) => {
      userSocketMap[userId] = socket.id;
      socket.join(roomId);
      User.findByIdAndUpdate(userId, { online: true }).exec();
      io.to(roomId).emit('user-online', userId);
    });

    socket.on('leave', ({ userId, roomId }) => {
      socket.leave(roomId);
      delete userSocketMap[userId];
      User.findByIdAndUpdate(userId, { online: false }).exec();
      io.to(roomId).emit('user-offline', userId);
    });

    socket.on('typing', ({ roomId, userId }) => {
      socket.to(roomId).emit('typing', { userId });
    });

    socket.on('message', async ({ roomId, message }) => {
      const msg = await Message.create(message);
      await ChatRoom.findByIdAndUpdate(roomId, { lastMessage: msg._id });
      io.to(roomId).emit('message', msg);
    });

    socket.on('read', ({ roomId, messageId, userId }) => {
      Message.findByIdAndUpdate(messageId, { $addToSet: { readBy: userId } }).exec();
      io.to(roomId).emit('read', { messageId, userId });
    });

    socket.on('disconnect', () => {
      // Find user by socket id and set offline
      const userId = Object.keys(userSocketMap).find((key) => userSocketMap[key] === socket.id);
      if (userId) {
        User.findByIdAndUpdate(userId, { online: false }).exec();
        delete userSocketMap[userId];
      }
    });
  });
};
