import axios from 'axios';
import { Transaction } from '../models/transactionModel';

export class BankService {
    async processDataPayment(cardNumber: string, amount: number):Promise<{status: string, message: string}> {
        

        try {
            const bankResponse = await axios.post(process.env.BANK_SERVICE_URL!, { cardNumber, amount }); 

            if (!bankResponse.data.isValid) {
                throw new Error('Error Data');
            }

            return {status: 'OK', message: ' '};
        } catch (error: any) {
            return {status: 'Fail', message: error.message as string};
        }
    
    }
}