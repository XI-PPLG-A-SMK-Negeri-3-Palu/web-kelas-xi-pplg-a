import { PrismaClient } from '@prisma/client';

// Singleton -- cegah banyak instance PrismaClient saat hot-reload.
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    // Tampilkan query SQL di terminal saat development -- bantu debug.
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
