import React, { useEffect } from 'react';
import { useChatStore } from '../store/chatStore';
import ChatList from '../components/ChatList';
import ChatBox from '../components/ChatBox';
import { getSocket } from '../lib/socket';

const ChatRoom = () => {
  const { rooms, messages, selectedRoomId, typingUsers, setRooms, setMessages, setSelectedRoomId, setTypingUsers } = useChatStore();

  useEffect(() => {
    // Fetch rooms and initial messages here (API call)
    // Example: setRooms([...]); setMessages([...]);
    const socket = getSocket();
    socket.on('message', (msg) => setMessages([...messages, msg]));
    socket.on('typing', ({ userId }) => setTypingUsers([...typingUsers, userId]));
    return () => {
      socket.off('message');
      socket.off('typing');
    };
  }, [messages, typingUsers, setMessages, setTypingUsers]);

  const handleSend = (content: string, type = 'text') => {
    const socket = getSocket();
    socket.emit('message', { roomId: selectedRoomId, message: { content, type } });
  };

  return (
    <div className="flex h-screen">
      <ChatList rooms={rooms} selectedRoomId={selectedRoomId} onSelect={setSelectedRoomId} />
      <div className="flex-1 flex flex-col">
        <ChatBox messages={messages} onSend={handleSend} typingUsers={typingUsers} />
      </div>
    </div>
  );
};

export default ChatRoom;
