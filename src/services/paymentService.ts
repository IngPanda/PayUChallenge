import axios from 'axios';
import { Transaction } from '../models/transactionModel';

export class PaymentService {
    async processPayment(cardNumber: string, amount: number) {
        // Call Anti-Fraud Service
        const fraudCheck = await axios.post(process.env.ANTI_FRAUD_SERVICE_URL!, { cardNumber, amount });

        if (!fraudCheck.data.isValid) {
            throw new Error('Fraud detected');
        }

        // Call Bank Service
        const bankResponse = await axios.post(process.env.BANK_SERVICE_URL!, { cardNumber, amount });

        // Save Transaction
        const transaction = new Transaction({
            cardNumber,
            amount,
            status: bankResponse.data.status
        });
        await transaction.save();

        return transaction;
    }

    async refund(transactionId: string) {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        
        // Logic for refunding via bank service can be added here

        transaction.status = 'refunded';
        await transaction.save();
        
        return transaction;
    }
}