import find from "@lib/db/repositories/find";
import { InvoiceDocument } from "@lib/db/schemas/invoice/Invoice";

export default async function getInvoices(filters: any, pageNumber?: number) {
  const result = await find<InvoiceDocument>(
    "invoices", 
    filters, 
    pageNumber ? { size: 25, number: pageNumber } : undefined
  )
  return result.data ? result : []
  //await new Promise(r => setTimeout(r, 20000))
}