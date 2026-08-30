-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TOP_CONTRIBUTOR', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "avatarUrl" TEXT,
    "bio" TEXT,
    "profileBorder" TEXT NOT NULL DEFAULT 'border-default',
    "socialLinks" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBadge" (
    "userId" TEXT NOT NULL,
    "badgeId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBadge_pkey" PRIMARY KEY ("userId","badgeId")
);

-- CreateTable
CREATE TABLE "ClassMemory" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClassMemory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_name_key" ON "Badge"("name");

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBadge" ADD CONSTRAINT "UserBadge_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassMemory" ADD CONSTRAINT "ClassMemory_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
