# Zerolink Frontend

This is the Next.js (TypeScript) frontend for Zerolink, a real-time chat application.

## Tech Stack
- Next.js
- Tailwind CSS
- shadcn/ui
- Zustand
- Socket.IO
- NextAuth.js

## Setup
1. Copy `.env.example` to `.env.local` and fill in values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure
- `components/` - Reusable UI components (ChatBox, ChatList, MessageInput, etc.)
- `pages/` - Next.js pages (Login, Register, ChatRoom, Profile, etc.)
- `store/` - Zustand state management
- `lib/` - Utility functions (Socket, API helpers, etc.)
