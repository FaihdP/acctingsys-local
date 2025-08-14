import find, { FindResults } from "@lib/db/repositories/find";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { InvoiceDocument } from "@lib/db/schemas/invoice/Invoice";
import getInvoiceStatus from "./util/getInvoiceStatus";
import FIND_DOCUMENTS_SIZE from "@ui/core/constants/FIndDocumentsSize";

export default async function getInvoices(
  filters: any, 
  pageNumber?: number
): Promise<FindResults<InvoiceDocument[]>> {
  const result = await find<InvoiceDocument>(
    COLLECTIONS.INVOICES, 
    filters, 
    pageNumber ? { size: FIND_DOCUMENTS_SIZE, number: pageNumber } : undefined
  )

  result.data.forEach(element => {
    element.status = getInvoiceStatus(element)
  });

  return result
}