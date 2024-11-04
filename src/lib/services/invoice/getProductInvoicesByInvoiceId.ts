import find from "@lib/db/repositories/find";
import { InvoiceProductsDocument } from "@lib/db/schemas/invoice/InvoiceProducts";

export default async function getProductInvoicesByInvoiceId(invoiceId: string) {
  const invoiceProducts = await find<InvoiceProductsDocument>(
    'invoiceProducts', 
    { invoiceId: invoiceId }, 
    undefined, 
    undefined, 
    { product: 1 }
  )

  return invoiceProducts.data.map(invoiceProduct => invoiceProduct.product.name)
}