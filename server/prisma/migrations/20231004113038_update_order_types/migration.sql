-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('freelancer', 'orderer');

-- CreateEnum
CREATE TYPE "PlaceOfService" AS ENUM ('myPlace', 'freelancerPlace', 'dontMatter');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('created', 'inprogress', 'completed');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT DEFAULT 'user',
    "status" "Status" NOT NULL DEFAULT 'freelancer',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "orderName" VARCHAR(255) NOT NULL,
    "category" VARCHAR(70) NOT NULL,
    "placeOfService" "PlaceOfService" NOT NULL,
    "description" VARCHAR(1000) DEFAULT 'user',
    "budgetMin" INTEGER NOT NULL,
    "budgetMax" INTEGER NOT NULL,
    "agreedBudget" INTEGER,
    "status" "OrderStatus" DEFAULT 'created',
    "completionDate" TIMESTAMP(3),
    "plannedCompletionDate" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
