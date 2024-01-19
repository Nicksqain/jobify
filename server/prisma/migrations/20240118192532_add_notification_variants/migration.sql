-- CreateEnum
CREATE TYPE "SourceList" AS ENUM ('system', 'moderation', 'user');

-- CreateEnum
CREATE TYPE "NotificationTypes" AS ENUM ('normal', 'task_rejected');

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "reason" TEXT,
ADD COLUMN     "source" "SourceList" DEFAULT 'system',
ADD COLUMN     "type" "NotificationTypes" DEFAULT 'normal';
