// payment-service/app/main.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRoutes from '../routes/payment';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/payment', paymentRoutes);

const PORT = process.env.PAYMENT_SERVICE_PORT;

app.listen(PORT, () => {
  console.log(`Payment service running on port ${PORT}`);
});
