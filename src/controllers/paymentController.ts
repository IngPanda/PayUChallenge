import { Request, Response } from 'express';
import Transaction from '../models/transactionModel';
import * as bankService from '../services/bankService';
import * as fraudService from '../services/fraudService';

export const processPayment = async (req: Request, res: Response) => {
    const transactionData = req.body;
    try {
        // Check for fraud
        const fraudCheckResult = await fraudService.checkFraud(transactionData);
        if (fraudCheckResult.isFraud) {
            return res.status(400).json({ message: 'Fraud detected.', fraudResult: fraudCheckResult });
        }

        // Process payment through bank
        const bankResponse = await bankService.processPayment(transactionData);

        // Store transaction in the database
        const transaction = new Transaction({ ...transactionData, status: 'completed' });
        await transaction.save();

        res.status(200).json({ message: 'Payment processed successfully.', bankResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during payment processing.', error });
    }
};

export const processRefund = async (req: Request, res: Response) => {
    const { transactionId } = req.body;
    try {
        // Find the transaction
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found.' });
        }

        // Process refund
        const refundResponse = await bankService.refundPayment(transactionId);
        transaction.status = 'refunded';
        await transaction.save();

        res.status(200).json({ message: 'Refund processed successfully.', refundResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during refund processing.', error });
    }
};
