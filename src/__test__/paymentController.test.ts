// src/tests/paymentController.test.ts


import request from 'supertest';
import app from '../index'; // Import the express app
import mongoose, { ConnectOptions } from 'mongoose';
import { ITransaction, Transaction } from '../models/transactionModel';

const mockingoose = require("mockingoose");
// Mock MongoDB connection
beforeAll(async () => {
  jest.mock('../models/transactionModel');
});


// Example test for creating a payment
describe('Payment Controller', () => {
  it('should create a payment successfully', async () => {
    const paymentData = {
      cardNumber: '4111111111111111',
      amount: 100,
    };

    const _doc: ITransaction = {
      _id: '507f191e810c19729de860ea',
      cardNumber: '4111111111111111',
      amount: 100,
    } as ITransaction;

    mockingoose(Transaction).toReturn(_doc, 'save');

    const response = await request(app).post('/api/payments').send(paymentData);


    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should return a 400 error for invalid payment data', async () => {
    const paymentData = {
      cardNumber: '4111111111111111',
      amount: -50,
    };

    const _doc: ITransaction = {
      _id: '507f191e810c19729de860ea',
      cardNumber: '4111111111111111',
      amount: 50,
    } as ITransaction;

    mockingoose(Transaction).toReturn(_doc, 'save');

    const response = await request(app).post('/api/payments').send(paymentData);
    
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});