import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { BaseService } from "./base.service";

export class TaxService extends BaseService {
  async getTaxByHsn(userId: string, hsnCode: string) {
    return this.prisma.tax.findUnique({
      where: { hsnCode_userId: { hsnCode, userId } },
    });
  }

  async createTax(
    userId: string,
    hsnCode: string,
    rate: Decimal,
  ) {
    return this.prisma.tax.create({
      data: {
        hsnCode,
        rate,
        userId,
      },
    });
  }

  async updateTax(
    userId: string,
    taxId: string,
    rate: Decimal,
    description?: string
  ) {
    await this.validateOwnership(userId, taxId, "tax");
    return this.prisma.tax.update({
      where: { id: taxId },
      data: { rate },
    });
  }

  async deleteTax(userId: string, taxId: string) {
    await this.validateOwnership(userId, taxId, "tax");
    return this.prisma.tax.delete({
      where: { id: taxId },
    });
  }

  async calculateTax(
    userId: string,
    hsnCode: string,
    price: Decimal,
    quantity: number,
    discount: Decimal = new Decimal(0)
  ) {
    const tax = await this.getTaxByHsn(userId, hsnCode);

    if (!tax) {
      throw new Error(`Tax configuration not found for HSN ${hsnCode}`);
    }

    const taxableAmount = price.mul(quantity).minus(discount);

    const taxAmount = taxableAmount.mul(tax.rate).div(100);

    return {
      rate: tax.rate,
      amount: taxAmount,
    };
  }
}
