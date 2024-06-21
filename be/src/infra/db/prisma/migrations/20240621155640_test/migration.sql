/*
  Warnings:

  - You are about to drop the column `role` on the `UserAuth` table. All the data in the column will be lost.
  - Added the required column `role` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAuth" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" TEXT NOT NULL;
