'use server';

import Stripe from 'stripe';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

import { verifyUser } from '@/lib/actions/user.actions';

export async function checkoutTransaction({
  carId,
  price,
  pickupDate,
  dropoffDate,
}: {
  carId: string;
  price: number;
  pickupDate: Date;
  dropoffDate: Date;
}) {
  try {
    const { id: userId } = await verifyUser();

    if (!userId) throw new Error('User not logged in');

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        carId,
        price,
        startDate: pickupDate,
        endDate: dropoffDate,
      },
    });

    const days =
      (new Date(dropoffDate).getTime() - new Date(pickupDate).getTime()) /
      (1000 * 60 * 60 * 24);

    const amount = Number(price * days * 100);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: amount,
            product_data: {
              name: `Car rental: ${carId}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        transactionId: transaction.id,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout/${transaction.id}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout/${transaction.id}?success=false`,
    });

    redirect(session.url!);
  } catch (error) {
    console.log('Error with checkoutTransaction server action:', error);
  }
}

export async function confirmTransaction(transactionId: string) {
  try {
    const transaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        pending: false,
      },
    });

    return transaction;
  } catch (error) {
    console.log('Error with confirmTransaction server action:', error);
  }
}
