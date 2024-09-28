// src/__tests__/paymentController.test.ts

import request from 'supertest';
import app from '../index'; // Import the express app
import mongoose, { ConnectOptions } from 'mongoose';

// Mock MongoDB connection
beforeAll(async () => {
  const mongoURI = process.env.MONGODB_URI;
  console.log(mongoURI);
  await mongoose.connect(mongoURI as string, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);
});

afterAll(async () => {
  await mongoose.connection.close();
});

// Example test for creating a payment
describe('Payment Controller', () => {
  it('should create a payment successfully', async () => {
    const paymentData = {
      cardHolderName: 'John Doe',
      cardNumber: '4111111111111111',
      amount: 100,
      status: 'pending',
    };

    const response = await request(app).post('/api/payments').send(paymentData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.cardHolderName).toBe(paymentData.cardHolderName);
  });

  it('should return a 400 error for invalid payment data', async () => {
    const paymentData = {
      cardHolderName: '',
      cardNumber: '1234',
      amount: -50,
      status: 'pending',
    };

    const response = await request(app).post('/api/payments').send(paymentData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
