import axios from 'axios';

const FRAUD_API_URL = 'http://fake-fraud-service.com/api/check'; // Temporal Fake URL

export const checkFraud = async (transaction: any) => {
    const response = await axios.post(FRAUD_API_URL, transaction);
    return response.data;
};
