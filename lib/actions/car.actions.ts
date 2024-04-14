'use server';

import prisma from '@/lib/prisma';
import { verifyUser } from '@/lib/actions/user.actions';
import { deleteFiles } from '@/lib/actions/image.actions';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';
import { CarData, CarImage, FullCarData, Params, UpdateCarData } from '@/types';
import { revalidatePath } from 'next/cache';

export async function getCityList(): Promise<{ location: string }[]> {
  const locations = await prisma.car.findMany({
    select: {
      location: true,
    },
    distinct: ['location'],
  });

  return locations;
}

export async function getPopularCars(): Promise<FullCarData[]> {
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
      userId: true,
      createdAt: true,
      updatedAt: true,
      images: {
        select: {
          url: true,
          key: true,
          blurDataURL: true,
        },
      },
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

export async function getCars(params: Params): Promise<{
  cars: FullCarData[];
  hasMore: boolean;
}> {
  const {
    city,
    search,
    type,
    capacity,
    price,
    page = 1,
    carsPerPage = 8,
    from,
    to,
  } = params;

  const whereClause: Prisma.CarWhereInput = {
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
          ? type.split(',').map((typeItem) => ({
              type: {
                contains: typeItem.trim(),
                mode: 'insensitive',
              },
            }))
          : [],
      },
      {
        OR: capacity
          ? capacity.split(',').map((capacityItem) => ({
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
    transaction: {
      every: {
        startDate: to
          ? {
              lte: new Date(to).toISOString(),
            }
          : undefined,
        endDate: from
          ? {
              gte: new Date(from).toISOString(),
            }
          : undefined,
      },
    },
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
      userId: true,
      createdAt: true,
      updatedAt: true,
      images: {
        select: {
          url: true,
          key: true,
          blurDataURL: true,
        },
      },
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

export async function getMaxPrice(): Promise<number> {
  const result = await prisma.car.aggregate({
    _max: {
      rentPrice: true,
    },
  });

  return result._max.rentPrice ?? 100;
}

export async function createCar({
  carData,
  carImages,
}: {
  carData: CarData;
  carImages: CarImage[];
}): Promise<string> {
  const { id } = await verifyUser();

  if (!id) throw new Error('You must be logged in to create a car');

  const newCar = await prisma.car.create({
    data: {
      ...carData,
      transmission: carData.transmission as 'Manual' | 'Automatic',
      userId: id,
    },
  });

  await prisma.carImage.createMany({
    data: carImages.map((image) => ({
      ...image,
      carId: newCar.id,
    })),
  });

  return newCar.id;
}

export async function getCar(carId: string): Promise<FullCarData | undefined> {
  const { id } = await verifyUser();

  if (!id) return undefined;

  const car = await prisma.car.findUnique({
    where: {
      id: carId,
    },
    include: {
      images: true,
    },
  });

  if (car?.userId !== id) return undefined;

  return car;
}

export async function getRentedCars(): Promise<FullCarData[]> {
  const { id, isUserLoggedIn } = await verifyUser();

  if (!id || !isUserLoggedIn) return [];

  const rentedCars = await prisma.car.findMany({
    where: {
      userId: id,
      transaction: {
        some: {
          endDate: {
            lte: new Date(),
          },
        },
      },
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
      userId: true,
      createdAt: true,
      updatedAt: true,
      images: {
        select: {
          url: true,
          key: true,
          blurDataURL: true,
        },
      },
      _count: {
        select: {
          UserLikesCar: true,
        },
      },
    },
  });

  const userLikesCars = await prisma.userLikesCar.findMany({
    where: {
      userId: id,
    },
  });

  const rentedCarsFinal = rentedCars.map((car: any) => {
    const isCarLiked = userLikesCars.some((like) => like.carId === car.id);

    return { ...car, isCarLiked };
  });

  return rentedCarsFinal;
}

export async function getMyCars(): Promise<FullCarData[]> {
  const { id } = await verifyUser();

  if (!id) return [];

  const myCars = await prisma.car.findMany({
    where: {
      userId: id,
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
      userId: true,
      createdAt: true,
      updatedAt: true,
      images: {
        select: {
          url: true,
          key: true,
          blurDataURL: true,
        },
      },
      _count: {
        select: {
          UserLikesCar: true,
        },
      },
    },
  });

  return myCars;
}

export async function deleteCar(carId: string): Promise<boolean> {
  try {
    const { id } = await verifyUser();

    if (!id) throw new Error('You must be logged in to delete a car');

    const car = await prisma.car.findUnique({
      where: {
        id: carId,
      },
      include: {
        images: {
          select: {
            key: true,
          },
        },
      },
    });

    if (car?.userId !== id)
      throw new Error('You are not allowed to delete this car');

    const imageKeys = car.images.map((image) => image.key);

    await deleteFiles(imageKeys);

    const deletedCar = await prisma.car.delete({
      where: {
        id: car.id,
      },
    });

    revalidatePath('/profile');

    return !!deletedCar;
  } catch (error) {
    return false;
  }
}

export async function updateCar({
  carData,
}: {
  carData: UpdateCarData;
}): Promise<boolean> {
  try {
    const { id } = await verifyUser();

    if (!id) throw new Error('You must be logged in to update a car');

    const car = await prisma.car.findUnique({
      where: {
        id: carData.id,
      },
    });

    if (car?.userId !== id)
      throw new Error('You are not allowed to update this car');

    await prisma.car.update({
      where: {
        id: car.id,
      },
      data: {
        ...carData,
        images: {
          deleteMany: {},
          create: carData.images.map((image) => ({
            url: image.url,
            key: image.key,
            blurDataURL: image.blurDataURL,
          })),
        },
      },
    });

    revalidatePath('/profile');

    return true;
  } catch (error) {
    return false;
  }
}
