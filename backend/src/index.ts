import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import authRoutes from './routes/auth';
import chatRoutes from './routes/chat';
import { setupSocket } from './socket';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }
});

const RedisStore = connectRedis(session);
const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.NEXTAUTH_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
}));

mongoose.connect(process.env.MONGODB_URI || '', { dbName: 'zerolink' })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

setupSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
