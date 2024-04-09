'use server';

import Stripe from 'stripe';
import { redirect } from 'next/navigation';

export async function checkoutTransaction({ transaction }: any) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});
  const { id: transactionId, price } = transaction;

  const amount = Number(price * 100);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: amount,
          product_data: {
            name: `Car rental: ${transactionId.toString()}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      transactionId,
    },
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout${transactionId}?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout${transactionId}?success=false`,
  });
  redirect(session.url!);
}

export async function confirmTransaction(transactionId: string) {
  // TODO: Update transaction to pending false
  return null;
}
