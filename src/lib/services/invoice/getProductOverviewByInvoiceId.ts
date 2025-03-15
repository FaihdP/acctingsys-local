import find from "@lib/db/repositories/find";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { InvoiceProductDocument } from "@lib/db/schemas/invoice/InvoiceProducts";

export default async function getProductOverviewByInvoiceId(invoiceId: string) {
  const invoiceProducts = await find<InvoiceProductDocument>(
    COLLECTIONS.INVOICE_PRODUCTS, 
    { invoiceId: invoiceId }, 
    undefined, 
    undefined, 
    { product: 1 }
  )

  return invoiceProducts.data.map(invoiceProduct => invoiceProduct.product?.name)
}