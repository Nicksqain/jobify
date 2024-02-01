/*
  Warnings:

  - You are about to drop the `TaskCompletion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskCompletion" DROP CONSTRAINT "TaskCompletion_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TaskCompletion" DROP CONSTRAINT "TaskCompletion_userId_fkey";

-- DropTable
DROP TABLE "TaskCompletion";
