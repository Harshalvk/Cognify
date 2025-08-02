/*
  Warnings:

  - You are about to drop the column `imagePublicId` on the `Editor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Editor" DROP COLUMN "imagePublicId",
ADD COLUMN     "editorImage" TEXT;
