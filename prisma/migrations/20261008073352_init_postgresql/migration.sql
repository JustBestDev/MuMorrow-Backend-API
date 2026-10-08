-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "BirthDay" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" DATE NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "profileImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyHoroscope" (
    "id" SERIAL NOT NULL,
    "horoscopeDate" DATE NOT NULL,
    "birthDay" "BirthDay" NOT NULL,
    "work" TEXT NOT NULL,
    "finance" TEXT NOT NULL,
    "love" TEXT NOT NULL,
    "health" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyHoroscope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Temple" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DECIMAL(10,7) NOT NULL,
    "longitude" DECIMAL(10,7) NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Temple_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TempleCategory" (
    "templeId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "TempleCategory_pkey" PRIMARY KEY ("templeId","categoryId")
);

-- CreateTable
CREATE TABLE "FortuneStick" (
    "id" SERIAL NOT NULL,
    "templeId" INTEGER NOT NULL,
    "stickNumber" INTEGER NOT NULL,
    "title" TEXT,
    "prediction" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FortuneStick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FortuneHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "templeId" INTEGER NOT NULL,
    "fortuneStickId" INTEGER NOT NULL,
    "predictionSnapshot" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FortuneHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "userId" INTEGER NOT NULL,
    "templeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("userId","templeId")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "templeId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DailyHoroscope_horoscopeDate_birthDay_key" ON "DailyHoroscope"("horoscopeDate", "birthDay");

-- CreateIndex
CREATE UNIQUE INDEX "Temple_name_key" ON "Temple"("name");

-- CreateIndex
CREATE INDEX "Temple_province_idx" ON "Temple"("province");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "FortuneStick_templeId_idx" ON "FortuneStick"("templeId");

-- CreateIndex
CREATE UNIQUE INDEX "FortuneStick_templeId_stickNumber_key" ON "FortuneStick"("templeId", "stickNumber");

-- CreateIndex
CREATE INDEX "FortuneHistory_userId_idx" ON "FortuneHistory"("userId");

-- CreateIndex
CREATE INDEX "FortuneHistory_templeId_idx" ON "FortuneHistory"("templeId");

-- CreateIndex
CREATE INDEX "FortuneHistory_fortuneStickId_idx" ON "FortuneHistory"("fortuneStickId");

-- CreateIndex
CREATE INDEX "Favorite_templeId_idx" ON "Favorite"("templeId");

-- CreateIndex
CREATE INDEX "Review_templeId_idx" ON "Review"("templeId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_templeId_key" ON "Review"("userId", "templeId");

-- AddForeignKey
ALTER TABLE "TempleCategory" ADD CONSTRAINT "TempleCategory_templeId_fkey" FOREIGN KEY ("templeId") REFERENCES "Temple"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TempleCategory" ADD CONSTRAINT "TempleCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FortuneStick" ADD CONSTRAINT "FortuneStick_templeId_fkey" FOREIGN KEY ("templeId") REFERENCES "Temple"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FortuneHistory" ADD CONSTRAINT "FortuneHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FortuneHistory" ADD CONSTRAINT "FortuneHistory_templeId_fkey" FOREIGN KEY ("templeId") REFERENCES "Temple"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FortuneHistory" ADD CONSTRAINT "FortuneHistory_fortuneStickId_fkey" FOREIGN KEY ("fortuneStickId") REFERENCES "FortuneStick"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_templeId_fkey" FOREIGN KEY ("templeId") REFERENCES "Temple"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_templeId_fkey" FOREIGN KEY ("templeId") REFERENCES "Temple"("id") ON DELETE CASCADE ON UPDATE CASCADE;
