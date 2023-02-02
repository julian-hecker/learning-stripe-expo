import express from 'express';
import 'dotenv/config';
import { port, stripe, stripePublishableKey } from './config';
import expressAsyncHandler from 'express-async-handler';

const app = express();

app.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    res.sendStatus(200);
  }),
);

app.post(
  '/payment',
  expressAsyncHandler(async (req, res) => {
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {
        customer: customer.id,
      },
      { apiVersion: '2022-11-15' },
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'usd',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: stripePublishableKey,
    });
  }),
);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

const createAccount = async () => {
  // prefill account data in config.individual['']
  const account = await stripe.accounts.create({ type: 'express' });
  return account;
};

const linkAccount = async () => {
  const accountLink = await stripe.accountLinks.create({
    account: 'acct_',
    // 'refresh_url':
    // 'return_url':
    type: 'account_onboarding',
  });
  return accountLink;
};
