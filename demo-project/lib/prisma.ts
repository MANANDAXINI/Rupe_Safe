import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () =>
  new PrismaClient({
    log: ['error', 'warn'],
  });

// Prevent multiple instances in dev (Next.js HMR)
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}