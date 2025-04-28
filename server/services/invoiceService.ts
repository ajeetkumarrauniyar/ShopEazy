import prisma from "@/config/dbClientConfig";

interface ProductInput {
  name: string;
  sellRate: string;
  quantity: string;
}

interface InvoiceInput {
  invoiceDate: string;
  products: ProductInput[];
}

export const invoiceService = {
  async createInvoice(clerkId: string, input: InvoiceInput) {
    try {
      const user = await prisma.user.findUnique({ where: { clerkId } });

      if (!user) {
        throw new Error("User not found");
      }

      // Calculate total amount
      const invoiceTotalAmount = input.products.reduce((total, product) => {
        const rate = parseFloat(product.sellRate) || 0;
        const qty = parseFloat(product.quantity) || 0;
        return total + rate * qty;
      }, 0);

      // Generate invoice number (Simple format: INV-2024-00001)
      const latestInvoice = await prisma.invoice.findFirst({
        orderBy: { createdAt: "desc" },
      });

      const nextInvoiceId = latestInvoice ? latestInvoice.id + 1 : 1;
      const invoiceNumber = `INV-${new Date().getFullYear()}-${String(
        nextInvoiceId
      ).padStart(5, "0")}`;

      // Create invoice
      const invoice = await prisma.invoice.create({
        data: {
          userId: user.id,
          invoiceDate: new Date(input.invoiceDate),
          invoiceNumber,
          invoiceTotalAmount,
          items: {
            create: input.products.map((product) => ({
              productName: product.name,
              sellRate: parseFloat(product.sellRate),
              quantity: parseFloat(product.quantity),
            })),
          },
        },
        include: {
          items: true,
        },
      });

      console.log(`✅ Invoice created for user ${user.id}`);
      return invoice;
    } catch (error) {
      console.error("❌ Failed to create invoice", error);
      throw new Error("Invoice creation failed");
    }
  },
};
