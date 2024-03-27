'use server';

import prisma from '@/lib/prisma';
import { verifyUser } from './user.actions';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Car } from '@prisma/client';

export async function getCityList() {
  const locations = await prisma.car.findMany({
    select: {
      location: true,
    },
    distinct: ['location'],
  });

  return locations;
}

export async function getPopularCars(): Promise<Car[]> {
  const { id } = await verifyUser();

  const popularCars = await prisma.car.findMany({
    select: {
      id: true,
      title: true,
      type: true,
      rentPrice: true,
      capacity: true,
      transmission: true,
      location: true,
      fuelCapacity: true,
      description: true,
      images: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          UserLikesCar: true,
        },
      },
    },
    orderBy: {
      UserLikesCar: {
        _count: 'desc',
      },
    },
    take: 8,
  });

  const popularCarsWithLikes = popularCars.filter(
    (car) => car._count.UserLikesCar > 0
  );

  if (!id) {
    return popularCarsWithLikes;
  }

  const userLikesCar = await prisma.userLikesCar.findMany({
    where: {
      userId: id,
    },
  });

  const popularCarsFinal = popularCarsWithLikes.map((car) => {
    const isCarLiked = userLikesCar.some((like) => like.carId === car.id);

    return { ...car, isCarLiked };
  });

  return popularCarsFinal;
}

export async function getRecommendedCars(
  location?: string,
  from?: string,
  to?: string,
  page: number = 1,
  carsPerPage: number = 8
): Promise<{ recommendedCars: Car[]; hasMoreCars: boolean }> {
  const { id } = await verifyUser();

  let recommendedCars: Car[];
  let totalCount: number;

  if (location) {
    totalCount = await prisma.car.count({
      where: {
        location,
      },
    });

    recommendedCars = await prisma.car.findMany({
      where: {
        location,
      },
      select: {
        id: true,
        title: true,
        type: true,
        rentPrice: true,
        capacity: true,
        transmission: true,
        location: true,
        fuelCapacity: true,
        description: true,
        images: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            UserLikesCar: true,
          },
        },
      },
      orderBy: [{ rentPrice: 'asc' }, { createdAt: 'desc' }, { title: 'asc' }],
      take: carsPerPage * page,
    });
  } else {
    totalCount = await prisma.car.count();

    recommendedCars = await prisma.car.findMany({
      select: {
        id: true,
        title: true,
        type: true,
        rentPrice: true,
        capacity: true,
        transmission: true,
        location: true,
        fuelCapacity: true,
        description: true,
        images: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            UserLikesCar: true,
          },
        },
      },
      orderBy: [{ rentPrice: 'asc' }, { createdAt: 'desc' }, { title: 'asc' }],
      take: carsPerPage * page,
    });
  }

  const hasMoreCars = recommendedCars.length < totalCount;

  if (!id) {
    return { recommendedCars, hasMoreCars };
  }

  const userLikesCar = await prisma.userLikesCar.findMany({
    where: {
      userId: id,
    },
  });

  recommendedCars = recommendedCars.map((car) => {
    const isCarLiked = userLikesCar.some((like) => like.carId === car.id);

    return { ...car, isCarLiked };
  });

  return { recommendedCars, hasMoreCars };
}

export async function getSearchCars(
  location?: string,
  from?: string,
  to?: string,
  page: number = 1,
  carsPerPage: number = 8
) {
  return { searchCars: [], hasMoreCars: false };
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

export async function getCars() {
  const { id } = await verifyUser();
  const cars = await prisma.car.findMany();

  if (!id) return cars;

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
