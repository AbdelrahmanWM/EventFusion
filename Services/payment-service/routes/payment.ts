// payment-service/app/routes/payment.ts
import { Router, Request, Response } from 'express';
import stripe from '../utils/stripe';

const router = Router();

router.post('/create-payment-intent', async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    if (!amount || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Amount must be a number' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error('Stripe error:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
