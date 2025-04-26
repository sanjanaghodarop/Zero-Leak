# Zerolink Backend

This is the Express.js (TypeScript) backend for Zerolink, a real-time chat application.

## Tech Stack
- Express.js
- TypeScript
- Socket.IO
- MongoDB (Mongoose)
- Redis
- JWT Auth

## Setup
1. Copy `.env.example` to `.env` and fill in values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure
- `src/models/` - Mongoose models (User, Message, ChatRoom)
- `src/routes/` - REST API routes
- `src/controllers/` - Route controllers
- `src/socket/` - Socket.IO logic
- `src/utils/` - Utility functions (JWT, Redis, etc.)
