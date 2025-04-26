export interface Message {
  _id: string;
  chatRoom: string;
  sender: { _id: string; username: string; avatar?: string };
  content: string;
  type: 'text' | 'image' | 'file';
  timestamp: string;
  isOwn?: boolean;
  readBy: string[];
}

export interface ChatRoom {
  _id: string;
  name?: string;
  isGroup: boolean;
  members: string[];
  lastMessagePreview?: string;
}
