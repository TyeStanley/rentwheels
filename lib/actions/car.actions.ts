'use server';

import prisma from '@/lib/prisma';

export async function getCars() {
  const cars = await prisma.car.findMany();
  console.log(cars);
  return cars;
}
