import find from "@lib/db/repositories/find";
import { InvoiceProductsDocument } from "@lib/db/schemas/invoice/InvoiceProducts";

export default async function getProductInvoicesByInvoiceId(invoiceId: string) {
  return await find<InvoiceProductsDocument>('invoiceProducts', { invoiceId: invoiceId })
}