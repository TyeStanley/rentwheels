import { PrismaClient } from '@prisma/client';

type PrismaClientSingleton = PrismaClient;

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClientSingleton;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
