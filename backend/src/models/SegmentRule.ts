import { Schema, model } from 'mongoose';
import { ISegmentRule } from '../interfaces/interfaces';

const SegmentRuleSchema = new Schema<ISegmentRule>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  logicType: { type: String, enum: ['AND', 'OR'], required: true },
  conditions: [
    {
      field: { type: String, required: true },
      op: { type: String, required: true },
      value: { type: Schema.Types.Mixed, required: true }
    }
  ],
}, { timestamps: true });

export default model<ISegmentRule>('SegmentRule', SegmentRuleSchema);
