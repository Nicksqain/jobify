/*
  Warnings:

  - A unique constraint covering the columns `[taskId]` on the table `TaskCompletion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TaskCompletion_taskId_key" ON "TaskCompletion"("taskId");
