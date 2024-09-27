import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { processPayment, processRefund } from './controllers/paymentController';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/payment-platform', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// API Endpoints
app.post('/api/pay', processPayment);
app.post('/api/refund', processRefund);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
