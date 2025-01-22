/*
  Warnings:

  - You are about to drop the column `fasilitas_images_id` on the `fasilitas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "fasilitas" DROP CONSTRAINT "fasilitas_fasilitas_images_id_fkey";

-- AlterTable
ALTER TABLE "fasilitas" DROP COLUMN "fasilitas_images_id";

-- AlterTable
ALTER TABLE "fasilitas_images" ADD COLUMN     "fasilitas_id" INTEGER;

-- AddForeignKey
ALTER TABLE "fasilitas_images" ADD CONSTRAINT "fasilitas_images_fasilitas_id_fkey" FOREIGN KEY ("fasilitas_id") REFERENCES "fasilitas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
