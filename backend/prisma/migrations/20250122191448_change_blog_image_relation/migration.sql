/*
  Warnings:

  - You are about to drop the column `fasilitas_id` on the `fasilitas_images` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "fasilitas_images" DROP CONSTRAINT "fasilitas_images_fasilitas_id_fkey";

-- AlterTable
ALTER TABLE "fasilitas" ADD COLUMN     "fasilitas_images_id" INTEGER;

-- AlterTable
ALTER TABLE "fasilitas_images" DROP COLUMN "fasilitas_id";

-- AddForeignKey
ALTER TABLE "fasilitas" ADD CONSTRAINT "fasilitas_fasilitas_images_id_fkey" FOREIGN KEY ("fasilitas_images_id") REFERENCES "fasilitas_images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
