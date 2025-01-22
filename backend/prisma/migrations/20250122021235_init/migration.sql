-- CreateTable
CREATE TABLE "page" (
    "id" SERIAL NOT NULL,
    "logo" TEXT NOT NULL,
    "navbar_images_id" INTEGER,
    "footer_images_id" INTEGER,
    "hero_image" TEXT NOT NULL,
    "info_images_id" INTEGER,

    CONSTRAINT "page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "navbar_images" (
    "id" SERIAL NOT NULL,
    "image" TEXT,

    CONSTRAINT "navbar_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footer_images" (
    "id" SERIAL NOT NULL,
    "image" TEXT,

    CONSTRAINT "footer_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info_images" (
    "id" SERIAL NOT NULL,
    "image" TEXT,

    CONSTRAINT "info_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tentang" (
    "id" SERIAL NOT NULL,
    "img_profil_big" TEXT,
    "img_profil_small" TEXT,
    "visi" TEXT,
    "misi_id" INTEGER,
    "struktur_pemerintah_image" TEXT,
    "fasilitas_category_id" INTEGER,
    "sarana_id" INTEGER,
    "prasarana_id" INTEGER,
    "data_monografi_id" INTEGER,
    "sdm" TEXT,
    "regulasi" TEXT,

    CONSTRAINT "tentang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "misi" (
    "id" SERIAL NOT NULL,
    "title" TEXT,

    CONSTRAINT "misi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fasilitas_category" (
    "id" SERIAL NOT NULL,
    "title" TEXT,

    CONSTRAINT "fasilitas_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fasilitas" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "sinopsis" TEXT,
    "content" TEXT,
    "category_id" INTEGER,

    CONSTRAINT "fasilitas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fasilitas_images" (
    "id" SERIAL NOT NULL,
    "img" TEXT,
    "fasilitas_id" INTEGER,

    CONSTRAINT "fasilitas_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sarana" (
    "id" SERIAL NOT NULL,
    "title" TEXT,

    CONSTRAINT "sarana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prasarana" (
    "id" SERIAL NOT NULL,
    "title" TEXT,

    CONSTRAINT "prasarana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_monografi" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "link" TEXT,

    CONSTRAINT "data_monografi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "layanan_category" (
    "id" SERIAL NOT NULL,
    "title" TEXT,

    CONSTRAINT "layanan_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "layanan_text" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "category_id" INTEGER,

    CONSTRAINT "layanan_text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "layanan_blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "sinopsis" TEXT,
    "layanan_content" TEXT,
    "category_id" INTEGER,

    CONSTRAINT "layanan_blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "layanan_image" (
    "id" SERIAL NOT NULL,
    "img" TEXT,
    "layanan_blog_id" INTEGER,

    CONSTRAINT "layanan_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info_category" (
    "id" SERIAL NOT NULL,
    "title" TEXT,

    CONSTRAINT "info_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info_blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "sinopsis" TEXT,
    "info_blog_content" TEXT,
    "category_id" INTEGER,

    CONSTRAINT "info_blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info_blog_image" (
    "id" SERIAL NOT NULL,
    "img" TEXT,
    "info_blog_id" INTEGER,

    CONSTRAINT "info_blog_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info_text" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "category_id" INTEGER,

    CONSTRAINT "info_text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "berita_category" (
    "id" SERIAL NOT NULL,
    "title" TEXT,

    CONSTRAINT "berita_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "berita" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "sinopsis" TEXT,
    "berita_content" TEXT,
    "category_id" INTEGER,

    CONSTRAINT "berita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "berita_image" (
    "id" SERIAL NOT NULL,
    "img" TEXT,
    "berita_id" INTEGER,

    CONSTRAINT "berita_image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "page" ADD CONSTRAINT "page_navbar_images_id_fkey" FOREIGN KEY ("navbar_images_id") REFERENCES "navbar_images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page" ADD CONSTRAINT "page_footer_images_id_fkey" FOREIGN KEY ("footer_images_id") REFERENCES "footer_images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page" ADD CONSTRAINT "page_info_images_id_fkey" FOREIGN KEY ("info_images_id") REFERENCES "info_images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tentang" ADD CONSTRAINT "tentang_misi_id_fkey" FOREIGN KEY ("misi_id") REFERENCES "misi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tentang" ADD CONSTRAINT "tentang_fasilitas_category_id_fkey" FOREIGN KEY ("fasilitas_category_id") REFERENCES "fasilitas_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tentang" ADD CONSTRAINT "tentang_sarana_id_fkey" FOREIGN KEY ("sarana_id") REFERENCES "sarana"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tentang" ADD CONSTRAINT "tentang_prasarana_id_fkey" FOREIGN KEY ("prasarana_id") REFERENCES "prasarana"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tentang" ADD CONSTRAINT "tentang_data_monografi_id_fkey" FOREIGN KEY ("data_monografi_id") REFERENCES "data_monografi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fasilitas" ADD CONSTRAINT "fasilitas_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "fasilitas_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fasilitas_images" ADD CONSTRAINT "fasilitas_images_fasilitas_id_fkey" FOREIGN KEY ("fasilitas_id") REFERENCES "fasilitas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "layanan_text" ADD CONSTRAINT "layanan_text_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "layanan_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "layanan_blog" ADD CONSTRAINT "layanan_blog_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "layanan_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "layanan_image" ADD CONSTRAINT "layanan_image_layanan_blog_id_fkey" FOREIGN KEY ("layanan_blog_id") REFERENCES "layanan_blog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_blog" ADD CONSTRAINT "info_blog_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "info_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_blog_image" ADD CONSTRAINT "info_blog_image_info_blog_id_fkey" FOREIGN KEY ("info_blog_id") REFERENCES "info_blog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_text" ADD CONSTRAINT "info_text_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "info_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "berita" ADD CONSTRAINT "berita_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "berita_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "berita_image" ADD CONSTRAINT "berita_image_berita_id_fkey" FOREIGN KEY ("berita_id") REFERENCES "berita"("id") ON DELETE SET NULL ON UPDATE CASCADE;
