/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `check` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "check" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT public.uuid_generate_v4(),
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "User_id_seq";
