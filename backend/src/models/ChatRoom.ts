import mongoose, { Document, Schema } from 'mongoose';

export interface IChatRoom extends Document {
  name?: string;
  isGroup: boolean;
  members: mongoose.Types.ObjectId[];
  lastMessage?: mongoose.Types.ObjectId;
}

const ChatRoomSchema = new Schema<IChatRoom>({
  name: { type: String },
  isGroup: { type: Boolean, default: false },
  members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
});

export default mongoose.model<IChatRoom>('ChatRoom', ChatRoomSchema);
