import { PrismaClient } from '@prisma/client';

// Mendeklarasikan ruang global untuk TypeScript agar mengenali objek prisma
declare global {
  var prisma: PrismaClient | undefined;
}

// Menerapkan pola Singleton
export const prisma = global.prisma || new PrismaClient();

// Pada lingkungan pengembangan, simpan instance ke ruang global agar tidak terjadi koneksi ganda
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
