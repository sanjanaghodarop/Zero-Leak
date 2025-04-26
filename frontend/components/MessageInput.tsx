import React, { useState } from 'react';

interface MessageInputProps {
  onSend: (content: string, type?: 'text' | 'image' | 'file') => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (value.trim()) {
      onSend(value);
      setValue('');
    }
  };

  return (
    <div className="flex items-center p-2 border-t bg-white dark:bg-gray-900">
      <input
        className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none"
        type="text"
        placeholder="Type a message..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
