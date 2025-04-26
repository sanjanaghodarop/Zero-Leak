import React from 'react';
import { ChatRoom } from '../types';

interface ChatListProps {
  rooms: ChatRoom[];
  selectedRoomId: string;
  onSelect: (roomId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ rooms, selectedRoomId, onSelect }) => (
  <div className="w-full max-w-xs h-full bg-white dark:bg-gray-900 border-r">
    <h2 className="p-4 font-bold text-lg">Chats</h2>
    <ul>
      {rooms.map((room) => (
        <li
          key={room._id}
          className={`p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${selectedRoomId === room._id ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          onClick={() => onSelect(room._id)}
        >
          <div className="font-semibold">{room.name || 'Private Chat'}</div>
          <div className="text-xs text-gray-500 truncate">{room.lastMessagePreview}</div>
        </li>
      ))}
    </ul>
  </div>
);

export default ChatList;
