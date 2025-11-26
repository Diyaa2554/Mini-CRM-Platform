import { Schema, model } from 'mongoose';
import { IOrder } from '../interfaces/interfaces';

const OrderSchema = new Schema<IOrder>({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  amount: { type: Number, required: true },
  items: [String],
  orderDate: { type: Date, required: true },
  externalId: { type: String, index: true, sparse: true }
}, { timestamps: true });

export default model<IOrder>('Order', OrderSchema);
