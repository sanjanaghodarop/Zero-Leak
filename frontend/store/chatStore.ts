import create from 'zustand';

interface ChatState {
  rooms: any[];
  messages: any[];
  selectedRoomId: string;
  typingUsers: string[];
  setRooms: (rooms: any[]) => void;
  setMessages: (messages: any[]) => void;
  setSelectedRoomId: (id: string) => void;
  setTypingUsers: (users: string[]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  rooms: [],
  messages: [],
  selectedRoomId: '',
  typingUsers: [],
  setRooms: (rooms) => set({ rooms }),
  setMessages: (messages) => set({ messages }),
  setSelectedRoomId: (id) => set({ selectedRoomId: id }),
  setTypingUsers: (users) => set({ typingUsers: users }),
}));
