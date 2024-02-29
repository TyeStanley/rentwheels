'use server';

import prisma from '@/lib/prisma';
import { verifyUser } from './user.actions';

export async function getCars() {
  const cars = await prisma.car.findMany();

  return cars;
}

export async function likeCar(carId: string): Promise<void> {
  const { id } = await verifyUser();

  if (!id) {
    throw new Error('You must be logged in to like a car');
  }

  const isCarLiked = prisma.userLikesCar.findUnique({
    where: {
      userId_carId: {
        userId: id,
        carId,
      },
    },
  });

  const carLikedBoolean = !!isCarLiked;

  if (carLikedBoolean) {
    await prisma.userLikesCar.delete({
      where: {
        userId_carId: {
          userId: id,
          carId,
        },
      },
    });
  } else {
    await prisma.userLikesCar.create({
      data: {
        userId: id,
        carId,
      },
    });
  }
}

export async function getCityList() {
  const locations = await prisma.car.findMany({
    select: {
      location: true,
    },
    distinct: ['location'],
  });

  return locations;
}
