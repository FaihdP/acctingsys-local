import find from "@lib/db/repositories/find";
import { InvoiceDocument } from "@lib/db/schemas/invoice/Invoice";

export default async function getInvoices(filters: any) {
  return await find<InvoiceDocument>("invoices", filters)
  //await new Promise(r => setTimeout(r, 20000))
}