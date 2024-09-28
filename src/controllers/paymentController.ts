import { Request, Response } from 'express';
import { PaymentService } from '../services/paymentService';

const paymentService = new PaymentService();

export class PaymentController {
    /**
     * Process a payment request.
     * Creates a payment record and validates with the two external services Fraud and Bank
     * @param {Request} req - The request object containing card number, amount, and currency.
     * @param {Response} res - The response object to send the result back to the client.
     * @returns {Promise<void>} - A promise that resolves to void.
     */
    async processPayment(req: Request, res: Response) {
        try {
            const { cardNumber, amount  } = req.body;
            if (!cardNumber  || amount <= 0 ) {
                throw new Error('invalid payment data');
            }
            const transaction = await paymentService.processPayment(cardNumber, amount);
            res.status(201).json(transaction);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
  /**
     * Process a refund request.
     * Performs a refund process
     * @param {Request} req - The request object containing card number, amount, and currency.
     * @param {Response} res - The response object to send the result back to the client.
     * @returns {Promise<void>} - A promise that resolves to void.
     */
    async refund(req: Request, res: Response) {
        try {
            const { transactionId } = req.params;
            const transaction = await paymentService.refund(transactionId);
            res.status(200).json(transaction);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}