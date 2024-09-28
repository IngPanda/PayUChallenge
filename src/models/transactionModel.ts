import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
    cardNumber: string;
    amount: number;
    status: string;
    createdAt: Date;
}

const transactionSchema: Schema = new Schema({
    cardNumber: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

