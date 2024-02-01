-- CreateTable
CREATE TABLE "CurrentExecutor" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "startTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTimestamp" TIMESTAMP(3),

    CONSTRAINT "CurrentExecutor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CurrentExecutor" ADD CONSTRAINT "CurrentExecutor_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentExecutor" ADD CONSTRAINT "CurrentExecutor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
