import axios from 'axios';

const BANK_API_URL = 'http://fake-bank-service.com/api/process'; // Temporal Fake URL

export const processPayment = async (transaction: any) => {
    const response = await axios.post(BANK_API_URL, transaction);
    return response.data;
};

export const refundPayment = async (transactionId: string) => {
    const response = await axios.post(`${BANK_API_URL}/refund`, { transactionId });
    return response.data;
};
