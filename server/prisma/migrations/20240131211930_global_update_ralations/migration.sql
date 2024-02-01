/*
  Warnings:

  - You are about to drop the `CurrentExecutor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CurrentExecutor" DROP CONSTRAINT "CurrentExecutor_orderId_fkey";

-- DropForeignKey
ALTER TABLE "CurrentExecutor" DROP CONSTRAINT "CurrentExecutor_userId_fkey";

-- DropForeignKey
ALTER TABLE "TaskResponse" DROP CONSTRAINT "TaskResponse_userId_fkey";

-- AlterTable
ALTER TABLE "TaskResponse" ALTER COLUMN "userId" DROP NOT NULL;

-- DropTable
DROP TABLE "CurrentExecutor";

-- CreateTable
CREATE TABLE "TaskAssignment" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "startTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTimestamp" TIMESTAMP(3),

    CONSTRAINT "TaskAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskAssignment_orderId_key" ON "TaskAssignment"("orderId");

-- AddForeignKey
ALTER TABLE "TaskResponse" ADD CONSTRAINT "TaskResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAssignment" ADD CONSTRAINT "TaskAssignment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskAssignment" ADD CONSTRAINT "TaskAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
