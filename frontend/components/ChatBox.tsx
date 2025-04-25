import React from 'react';
import { Message } from '../types';
import MessageInput from './MessageInput';

interface ChatBoxProps {
  messages: Message[];
  onSend: (content: string, type?: 'text' | 'image' | 'file') => void;
  typingUsers: string[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, onSend, typingUsers }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-3 bg-white dark:bg-gray-900">
        {messages.map((msg) => (
          <div key={msg._id} className={`mb-2 ${msg.isOwn ? 'text-right' : 'text-left'}`}>
            <span className="inline-block px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              {msg.content}
            </span>
            <span className="text-xs text-gray-400 ml-2">{msg.timestamp}</span>
          </div>
        ))}
        {typingUsers.length > 0 && (
          <div className="text-xs text-blue-400">{typingUsers.join(', ')} typing...</div>
        )}
      </div>
      <MessageInput onSend={onSend} />
    </div>
  );
};

export default ChatBox;
