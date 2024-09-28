import { Router } from 'express';
import { PaymentController } from '../controllers/paymentController';

const router = Router();
const paymentController = new PaymentController();

router.post('/payments', paymentController.processPayment);
router.post('/refund/:transactionId', paymentController.refund);

export default router;