import axios from 'axios';
import { Transaction } from '../models/transactionModel';

export class BankService {
    async processDataPayment(cardNumber: string, amount: number):Promise<{status: string, message: string}> {
        

        try {
            const fraudCheck = await axios.post(process.env.ANTI_FRAUD_SERVICE_URL!, { cardNumber, amount });

            if (!fraudCheck.data.isValid) {
                throw new Error('Fraud detected');
            }

            return {status: 'OK', message: ' '};
        } catch (error: any) {
            return {status: 'Fail', message: error.message as string};
        }
    
    }
}