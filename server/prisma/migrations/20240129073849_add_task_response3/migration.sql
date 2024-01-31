/*
  Warnings:

  - Made the column `executionCost` on table `TaskResponse` required. This step will fail if there are existing NULL values in that column.
  - Made the column `executionDate` on table `TaskResponse` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TaskResponse" ALTER COLUMN "executionCost" SET NOT NULL,
ALTER COLUMN "executionDate" SET NOT NULL;
