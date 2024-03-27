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

export async function getCars(params: any) {
  const {
    city,
    search,
    type,
    capacity,
    price,
    page = 1,
    carsPerPage = 8,
  } = params;

  const whereClause: any = {
    location: city
      ? {
          contains: city,
          mode: 'insensitive',
        }
      : undefined,
    title: search
      ? {
          contains: search,
          mode: 'insensitive',
        }
      : undefined,
    AND: [
      {
        OR: type
          ? type.split(',').map((typeItem: any) => ({
              type: {
                contains: typeItem.trim(),
                mode: 'insensitive',
              },
            }))
          : [],
      },
      {
        OR: capacity
          ? capacity.split(',').map((capacityItem: any) => ({
              capacity: {
                gte: Number(capacityItem.trim()),
              },
            }))
          : [],
      },
    ],
    rentPrice: price
      ? {
          lte: Number(price),
        }
      : undefined,
  };

  let cars = await prisma.car.findMany({
    where: whereClause,
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
    take: page * carsPerPage,
  });

  const totalCount = await prisma.car.count({
    where: whereClause,
  });

  const hasMore = cars.length < totalCount;

  const { id } = await verifyUser();

  if (!id) return { cars, hasMore };

  const userLikesCar = await prisma.userLikesCar.findMany({
    where: {
      userId: id,
    },
  });

  cars = cars.map((car) => {
    const isCarLiked = userLikesCar.some((like) => like.carId === car.id);

    return { ...car, isCarLiked };
  });

  return { cars, hasMore };
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
