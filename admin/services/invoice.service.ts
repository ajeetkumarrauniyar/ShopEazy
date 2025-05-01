import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { TaxService } from "./tax.service";

export class InvoiceService {
  private prisma = new PrismaClient();
  private taxService = new TaxService();

  async createInvoice(
    userId: string,
    items: Array<{
      productId: string;
      quantity: number;
      discount?: Decimal;
    }>,
    customerId: string,
    discount: Decimal = new Decimal(0)
  ) {
    return this.prisma.$transaction(async (tx) => {
      const customer = await tx.customer.findFirst({
        where: { id: customerId, userId },
      });

      if (!customer) throw new Error("Customer not found");

      let taxAmount = new Decimal(0);
      let subtotal = new Decimal(0);
      const invoiceItems = [];

      for (const item of items) {
        const product = await tx.product.findFirst({
          where: { id: item.productId, userId },
        });

        if (!product) throw new Error(`Product ${item.productId} not found`);
        if (!product.hsnCode) {
          throw new Error(`Product ${product.name} requires HSN code`);
        }
        if (product.quantity < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }

        if (!product.hsnCode) {
          throw new Error(`Product ${product.name} missing HSN code`);
        }

        const { rate, amount } = await this.taxService.calculateTax(
          userId,
          product.hsnCode,
          product.price,
          item.quantity,
          item.discount || new Decimal(0)
        );

        const itemTotal = product.price
          .mul(item.quantity)
          .minus(item.discount || 0)
          .plus(amount);

        taxAmount = taxAmount.add(amount);
        subtotal = subtotal.add(itemTotal);

        invoiceItems.push({
          quantity: item.quantity,
          price: product.price,
          discount: item.discount || new Decimal(0),
          taxRate: rate,
          total: itemTotal,
          hsnCode: product.hsnCode,
          productId: product.id,
          sellRate: product.sellPrice,
          purchaseRate: product.costPrice,
        });

        await tx.product.update({
          where: { id: product.id },
          data: { quantity: product.quantity - item.quantity },
        });
      }

      return tx.invoice.create({
        data: {
          userId,
          customerId,
          invoiceNumber: `INV-${Date.now()}`,
          invoiceDate: new Date(),
          invoiceTotalAmount: subtotal.minus(discount),
          taxAmount,
          discount,
          items: { create: invoiceItems },
        },
        include: { items: true, customer: true },
      });
    });
  }
}
