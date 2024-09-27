import mongoose, { Document, Schema } from 'mongoose';

interface ITransaction extends Document {
    amount: number;
    currency: string;
    cardHolder: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    status: 'pending' | 'completed' | 'refunded';
    createdAt: Date;
}

const transactionSchema: Schema = new Schema({
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    cardHolder: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expirationDate: { type: String, required: true },
    cvv: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'refunded'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ITransaction>('Transaction', transactionSchema);
