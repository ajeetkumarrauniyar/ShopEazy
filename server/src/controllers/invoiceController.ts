import { AuthenticatedRequest } from "@/middlewares/index.ts";
import { asyncHandler, ApiError, logger } from "@/utils/index.ts";
import { prisma } from "@/config/index.ts";
import { InvoiceItemInput, InvoiceRequestBody } from "@/types/invoiceTypes.ts";
import { InvoiceType } from "@prisma/client";

export const createInvoice = asyncHandler<AuthenticatedRequest>(async (req: AuthenticatedRequest) => {
  const userId = req.auth.userId;

  const {
    invoiceType,
    invoiceDate,
    dueDate,
    partyName,
    partyGstin,
    billingAddress,
    shippingAddress,
    partyState,
    stateCode,
    items,
    paymentMode = "CASH",
    paymentStatus = "PENDING",
  } = req.body as InvoiceRequestBody;

  // Validate invoice type
  if (!Object.values(InvoiceType).includes(invoiceType)) {
    throw ApiError.badRequest(`Invalid invoice type. Must be one of: ${Object.values(InvoiceType).join(", ")}`);
  }

  // Validate required fields
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw ApiError.badRequest("Invoice items are required and must be an array");
  }

  // Calculate totals
  const subTotal = items.reduce(
    (sum: number, item: InvoiceItemInput) => sum + Number(item.quantity) * Number(item.unitPrice),
    0,
  );

  const totalGst = items.reduce(
    (sum, item) => sum + Number(item.cgstAmount || 0) + Number(item.sgstAmount || 0) + Number(item.igstAmount || 0),
    0,
  );

  const unroundedTotal = subTotal + totalGst;
  const totalAmount = Math.round(unroundedTotal); // nearest rupee
  const roundOff = totalAmount - unroundedTotal; // can be positive or negative (e.g., ₹0.35 or -₹0.49)

  try {
    // Create the invoice with items in a transaction
    const invoice = await prisma.$transaction(async (tx) => {
      // Create the main invoice
      const newInvoice = await tx.invoice.create({
        data: {
          //TODO: Add a better invoice number generation logic
          invoiceNumber: `INV-${Date.now()}`,
          invoiceType,
          invoiceDate: new Date(invoiceDate),
          dueDate: new Date(dueDate),
          partyName,
          partyGstin,
          billingAddress,
          shippingAddress,
          partyState,
          stateCode,
          subTotal,
          roundOff,
          totalAmount,
          paymentMode,
          paymentStatus,
          // Link to the authenticated user based on invoice type
          ...(invoiceType === InvoiceType.SALES ? { sellerId: userId } : { buyerId: userId }),
          items: {
            create: items.map((item: InvoiceItemInput, index: number) => ({
              serialNumber: index + 1,
              itemId: item.itemId,
              quantity: item.quantity,
              unit: item.unit,
              unitPrice: item.unitPrice,
              amount: item.amount,
              hsnCode: item.hsnCode,
              cgstPercentage: item.cgstPercentage,
              cgstAmount: item.cgstAmount,
              sgstPercentage: item.sgstPercentage,
              sgstAmount: item.sgstAmount,
              igstPercentage: item.igstPercentage,
              igstAmount: item.igstAmount,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      // Update stock levels for each item
      for (const item of items) {
        await tx.itemMaster.update({
          where: { id: item.itemId },
          data: {
            currentStock: {
              [invoiceType === InvoiceType.SALES ? "decrement" : "increment"]: item.quantity,
            },
          },
        });
      }

      return newInvoice;
    });

    logger.info(`Invoice created successfully with ID: ${invoice.id}`);
    return invoice;
  } catch (error) {
    logger.error("Database error while creating invoice:", error);
    throw ApiError.from(error, "Failed to create invoice");
  }
});
