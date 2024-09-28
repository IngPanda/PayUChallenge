import { Request, Response } from 'express';
import { PaymentService } from '../services/paymentService';

const paymentService = new PaymentService();

export class PaymentController {
    async processPayment(req: Request, res: Response) {
        try {
            const { cardNumber, amount, expirationDate, code } = req.body;
            if (!cardNumber || !cardNumber || !expirationDate || amount <= 0 || !code ) {
                res.status(400).json({ error: 'Invalid payment data' });
              }
            const transaction = await paymentService.processPayment(cardNumber, amount, code,expirationDate);
            res.status(201).json(transaction);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

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