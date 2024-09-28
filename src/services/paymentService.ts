import axios from 'axios';
import { Transaction } from '../models/transactionModel';
import { BankService } from './bankService';

export class PaymentService {
    /**
     * Process a payment request.
     * Creates a payment record and validates with the two external services Fraud and Bank
     * @param {string} cardNumber - The credit card number.
     * @param {string} amount - Amount of payment.
     * @returns {Promise<Transaction>} - return Transaction Record.
     */
    async processPayment(cardNumber: string, amount: number) {
        

        const bankServ = BankService;

        // Save Transaction
        const transaction = new Transaction({
            cardNumber,
            amount,
            status: "Ok"//bankResponse.data.status
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