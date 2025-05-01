/*
  Warnings:

  - A unique constraint covering the columns `[invoiceNumber,userId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cost_price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sell_price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "cost_price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "sell_price" DECIMAL(65,30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_userId_key" ON "Invoice"("invoiceNumber", "userId");
