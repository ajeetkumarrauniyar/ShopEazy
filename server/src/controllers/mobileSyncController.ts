import { AuthenticatedRequest } from "@/middlewares/index.ts";
import { asyncHandler, ApiError, logger } from "@/utils/index.ts";
import { prisma } from "@/config/index.ts";
import {
  MobileSyncRequest,
  MobileSyncQueueItem,
  MobileSyncBatchRequest,
  MobileSyncResponse,
  MobileInvoiceData,
} from "@/types/invoiceTypes.ts";
import { InvoiceType, PaymentMode, PaymentStatus } from "@prisma/client";

/**
 * Sync single invoice from mobile app
 */
export const syncMobileInvoice = asyncHandler<AuthenticatedRequest>(async (req: AuthenticatedRequest) => {
  const userId = req.auth.userId;
  const mobileInvoiceData: MobileInvoiceData = req.body;

  // Validate required fields
  if (!mobileInvoiceData.invoiceNumber || !mobileInvoiceData.customerName || !mobileInvoiceData.lineItems?.length) {
    throw ApiError.badRequest("Missing required fields: invoiceNumber, customerName, or lineItems");
  }

  try {
    // Transform mobile invoice data to server format
    const serverInvoiceData = transformMobileToServerFormat(mobileInvoiceData, userId);

    // Create the invoice with items in a transaction
    const invoice = await createInvoiceFromMobileData(serverInvoiceData);

    logger.info(`Mobile invoice ${mobileInvoiceData.invoiceNumber} synced successfully with ID: ${invoice.id}`);

    return {
      success: true,
      message: "Invoice synced successfully",
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
    };
  } catch (error) {
    logger.error("Error syncing mobile invoice:", error);
    throw ApiError.from(error, "Failed to sync mobile invoice");
  }
});

/**
 * Batch sync multiple operations from mobile app sync queue
 */
export const syncMobileBatch = asyncHandler<AuthenticatedRequest>(async (req: AuthenticatedRequest) => {
  const userId = req.auth.userId;
  const { operations }: MobileSyncBatchRequest = req.body;

  if (!operations || !Array.isArray(operations) || operations.length === 0) {
    throw ApiError.badRequest("Operations array is required and must not be empty");
  }

  const response: MobileSyncResponse = {
    success: true,
    message: "",
    syncedItems: 0,
    errors: [],
  };

  // Process each operation
  for (const operation of operations) {
    try {
      await processSyncOperation(operation, userId);
      response.syncedItems++;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      response.errors.push({
        operation,
        error: errorMessage,
      });
      logger.error(`Failed to process sync operation:`, { operation, error: errorMessage });
    }
  }

  // Update response based on results
  if (response.errors.length === 0) {
    response.message = `Successfully synced ${response.syncedItems} operations`;
  } else {
    response.success = false;
    response.message = `Synced ${response.syncedItems} operations with ${response.errors.length} errors`;
  }

  logger.info(`Batch sync completed: ${response.syncedItems} success, ${response.errors.length} errors`);
  return response;
});

/**
 * Process a single sync operation from mobile sync queue
 */
async function processSyncOperation(operation: MobileSyncQueueItem, userId: string): Promise<void> {
  const payload = JSON.parse(operation.payload) as MobileSyncRequest;

  switch (operation.action) {
    case "INSERT":
      await handleMobileInvoiceInsert(payload.invoice, userId);
      break;
    case "UPDATE":
      await handleMobileInvoiceUpdate(operation.rowId, payload.invoice, userId);
      break;
    case "DELETE":
      await handleMobileInvoiceDelete(operation.rowId, userId);
      break;
    default:
      throw new Error(`Unknown sync action: ${operation.action}`);
  }
}

/**
 * Handle mobile invoice insert operation
 */
async function handleMobileInvoiceInsert(mobileInvoice: MobileInvoiceData, userId: string): Promise<void> {
  // Check if invoice already exists (prevent duplicates)
  const existingInvoice = await prisma.invoice.findFirst({
    where: {
      invoiceNumber: mobileInvoice.invoiceNumber,
      sellerId: userId,
    },
  });

  if (existingInvoice) {
    logger.info(`Invoice ${mobileInvoice.invoiceNumber} already exists, skipping insert`);
    return;
  }

  const serverInvoiceData = transformMobileToServerFormat(mobileInvoice, userId);
  await createInvoiceFromMobileData(serverInvoiceData);
}

/**
 * Handle mobile invoice update operation
 */
async function handleMobileInvoiceUpdate(
  mobileInvoiceId: number,
  mobileInvoice: MobileInvoiceData,
  userId: string,
): Promise<void> {
  //TODO: For now, we'll treat updates as inserts since we don't have a direct mapping
  //TODO: In a production system, you might want to implement proper update logic
  logger.info(`Processing update for mobile invoice ID ${mobileInvoiceId} as insert`);
  await handleMobileInvoiceInsert(mobileInvoice, userId);
}

/**
 * Handle mobile invoice delete operation
 */
async function handleMobileInvoiceDelete(mobileInvoiceId: number, userId: string): Promise<void> {
  //TODO: Since we don't have direct ID mapping, we might need additional logic here
  // For now, we'll log the operation
  logger.info(`Processing delete for mobile invoice ID ${mobileInvoiceId} - not implemented`);
  //TODO: In production, you might want to implement soft delete or maintain ID mapping
}

/**
 * Transform mobile invoice data to server invoice format
 */
function transformMobileToServerFormat(mobileInvoice: MobileInvoiceData, userId: string) {
  return {
    invoiceNumber: mobileInvoice.invoiceNumber,
    invoiceType: InvoiceType.SALES,
    invoiceDate: new Date(mobileInvoice.invoiceDate),
    dueDate: new Date(mobileInvoice.invoiceDate), // Set same as invoice date for now
    partyName: mobileInvoice.customerName,
    partyGstin: mobileInvoice.customerGstin || null,
    billingAddress: mobileInvoice.customerStation || "Address not provided",
    shippingAddress: null,
    partyState: "Unknown", // You might want to derive this from customer data
    stateCode: "99", // Default state code - should be configurable
    subTotal: mobileInvoice.subtotal,
    totalGstAmount: mobileInvoice.taxAmount,
    totalAmount: mobileInvoice.totalAmount,
    roundOff: 0, // Calculate if needed
    paymentMode: PaymentMode.CASH,
    paymentStatus: PaymentStatus.PENDING,
    sellerId: userId,
    items: mobileInvoice.lineItems.map((item, index) => ({
      serialNumber: index + 1,
      productName: item.productName,
      quantity: item.quantity,
      unitPrice: item.rate,
      amount: item.amount,
      unit: "PCS", // Default unit - should be configurable
      hsnCode: "0000", // Default HSN - should be derived from product
      cgstPercentage: mobileInvoice.taxRate / 2,
      cgstAmount: mobileInvoice.taxAmount / 2,
      sgstPercentage: mobileInvoice.taxRate / 2,
      sgstAmount: mobileInvoice.taxAmount / 2,
      igstPercentage: 0,
      igstAmount: 0,
    })),
  };
}

/**
 * Create invoice from transformed mobile data
 */
async function createInvoiceFromMobileData(invoiceData: any) {
  return await prisma.$transaction(async (tx) => {
    // Create or find the item master entries first
    const processedItems = [];

    for (const item of invoiceData.items) {
      //TODO: For now, we'll create a simple item master entry
      //TODO: In production, you might want to match existing items
      let itemMaster = await tx.itemMaster.findFirst({
        where: { itemName: item.productName },
      });

      if (!itemMaster) {
        itemMaster = await tx.itemMaster.create({
          data: {
            itemCode: `ITEM-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            itemName: item.productName,
            hsnCode: item.hsnCode,
            unit: item.unit,
            cgstPercentage: item.cgstPercentage,
            sgstPercentage: item.sgstPercentage,
            igstPercentage: item.igstPercentage,
            purchasePrice: item.unitPrice,
            sellingPrice: item.unitPrice,
            currentStock: 0, // Initialize with 0 stock
            minimumStock: 0,
          },
        });
      }

      processedItems.push({
        ...item,
        itemId: itemMaster.id,
      });
    }

    // Create the main invoice
    const invoice = await tx.invoice.create({
      data: {
        invoiceNumber: invoiceData.invoiceNumber,
        invoiceType: invoiceData.invoiceType,
        invoiceDate: invoiceData.invoiceDate,
        dueDate: invoiceData.dueDate,
        partyName: invoiceData.partyName,
        partyGstin: invoiceData.partyGstin,
        billingAddress: invoiceData.billingAddress,
        shippingAddress: invoiceData.shippingAddress,
        partyState: invoiceData.partyState,
        stateCode: invoiceData.stateCode,
        subTotal: invoiceData.subTotal,
        totalGstAmount: invoiceData.totalGstAmount,
        totalAmount: invoiceData.totalAmount,
        roundOff: invoiceData.roundOff,
        paymentMode: invoiceData.paymentMode,
        paymentStatus: invoiceData.paymentStatus,
        sellerId: invoiceData.sellerId,
        isSynced: true, // Mark as synced since it's coming from mobile
        items: {
          create: processedItems.map((item) => ({
            serialNumber: item.serialNumber,
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

    return invoice;
  });
}
