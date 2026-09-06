/*
  Warnings:

  - The `profileBorder` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProfileBorder" AS ENUM ('DEFAULT', 'GOLD', 'NEON');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profileBorder",
ADD COLUMN     "profileBorder" "ProfileBorder" NOT NULL DEFAULT 'DEFAULT';
