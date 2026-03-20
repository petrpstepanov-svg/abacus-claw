import { PrismaClient } from '@prisma/client';

/**
 * Prisma singleton.
 *
 * In development Next.js clears Node.js cache on every hot-reload,
 * which would create a new PrismaClient each time. We cache the
 * instance on `globalThis` to prevent exhausting DB connections.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export { prisma };
