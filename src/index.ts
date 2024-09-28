// src/app.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import paymentRoutes from './routes/paymentRoutes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', paymentRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Connected to MongoDB');

    const PORT = process.env.PORT || 3000;
    const server = await app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    return server;
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }

};

startServer();

// Export the app for testing
export default app;