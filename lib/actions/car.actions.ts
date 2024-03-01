'use server';

import prisma from '@/lib/prisma';
import { verifyUser } from './user.actions';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function getCars() {
  const { id } = await verifyUser();
  const cars = await prisma.car.findMany();

  const userLikesCar = await prisma.userLikesCar.findMany({
    where: {
      userId: id,
    },
  });

  const carsWithLikes = cars.map((car) => {
    const isCarLiked = userLikesCar.some((like) => like.carId === car.id);

    return { ...car, isCarLiked };
  });

  return carsWithLikes;
}

export async function likeCar(carId: string): Promise<boolean> {
  const { id: userId } = await verifyUser();

  if (!userId) {
    throw new Error('You must be logged in to like a car');
  }

  try {
    await prisma.userLikesCar.create({
      data: {
        userId,
        carId,
      },
    });

    return true;
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      await prisma.userLikesCar.delete({
        where: {
          userId_carId: {
            userId,
            carId,
          },
        },
      });

      return false;
    } else {
      throw error;
    }
  }
}

export async function getPopularCars() {
  // need to check if the user is logged in.
  // if the user is not logged in then return 8 of the most popular cars based on their likes
  // if the user is logged in then calculate what cares that they have liked and haven't liked and return 8 of the most popular cars based on their likes

  const { id } = await verifyUser();

  if (!id) {
    const popularCars = await prisma.car.findMany({
      include: {
        UserLikesCar: true,
      },
      take: 8,
    });

    return popularCars;
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
