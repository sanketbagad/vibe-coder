-- CreateTable
CREATE TABLE "Usage" (
    "key" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "expires" TIMESTAMP(3),

    CONSTRAINT "Usage_pkey" PRIMARY KEY ("key")
);
