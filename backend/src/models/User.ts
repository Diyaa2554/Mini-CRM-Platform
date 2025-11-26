import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/interfaces';

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  provider: { type: String, required: true },
}, { timestamps: true });

export default model<IUser>('User', UserSchema);
