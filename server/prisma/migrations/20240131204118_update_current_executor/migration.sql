/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `CurrentExecutor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CurrentExecutor_orderId_key" ON "CurrentExecutor"("orderId");
