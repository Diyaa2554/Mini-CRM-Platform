import { Schema, model } from 'mongoose';
import { IAIAuditLog } from '../interfaces/interfaces';

const AIAuditLogSchema = new Schema<IAIAuditLog>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['message-generator', 'parser'], required: true },
  input: { type: String, required: true },
  output: { type: String, required: true },
}, { timestamps: true });

export default model<IAIAuditLog>('AIAuditLog', AIAuditLogSchema);
