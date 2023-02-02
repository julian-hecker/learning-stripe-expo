import Stripe from 'stripe';

export const config = {
  port: process.env.PORT ?? '3001',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? '',
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY ?? '',
};

export const { port, stripeSecretKey, stripePublishableKey } = config;

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2022-11-15',
});
