import find, { FindResults } from "@lib/db/repositories/find";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { InvoiceDocument, InvoiceType } from "@lib/db/schemas/invoice/Invoice";
import getInvoiceStatus from "./util/getInvoiceStatus";

export default async function getInvoices(
  filters: any, 
  pageNumber?: number
): Promise<FindResults<InvoiceDocument[]>> {
  const result = await find<InvoiceDocument>(
    COLLECTIONS.INVOICES, 
    filters, 
    pageNumber ? { size: 25, number: pageNumber } : undefined
  )

  result.data.forEach(element => {
    element.status = getInvoiceStatus(element)
  });

  return result.data ? result : { data: [], pages_number: 0 }
}