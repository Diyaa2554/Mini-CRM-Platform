import { Schema, model } from 'mongoose';
import { ICampaign } from '../interfaces/interfaces';

const CampaignSchema = new Schema<ICampaign>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
  intent: { type: String },
  ruleId: { type: Schema.Types.ObjectId, ref: 'SegmentRule', required: true },
  customerIds: [{ type: Schema.Types.ObjectId, ref: 'Customer' }], 
  status: { type: String, enum: ['draft', 'sent', 'error'], default: 'draft' },
  sentAt: Date,
}, { timestamps: true });

export default model<ICampaign>('Campaign', CampaignSchema);
