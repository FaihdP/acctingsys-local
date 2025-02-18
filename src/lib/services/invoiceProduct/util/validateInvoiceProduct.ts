import { InvoiceProducts } from "@lib/db/schemas/invoice/InvoiceProducts";

export default function validateInvoiceProduct(invoiceProduct: InvoiceProducts) {
  if (!invoiceProduct.invoiceId) {
    throw new Error('Invoice ID is required')
  }

  if (!invoiceProduct.totalValue || invoiceProduct.totalValue <= 0) {
    throw new Error('Total Value is required and must be greater than 0')
  }
}