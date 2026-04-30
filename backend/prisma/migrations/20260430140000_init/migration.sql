CREATE TABLE "books" (
  "id" TEXT NOT NULL,
  "sku" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "author" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "price_cents" INTEGER NOT NULL,
  "cover_image_url" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "books_sku_key" ON "books"("sku");
