import find, { FindResults } from "@lib/db/repositories/find";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { InvoiceProductsDocument } from "@lib/db/schemas/invoice/InvoiceProducts";
import handleError from "@lib/util/error/handleError";

export default async function getInvoiceProductsByInvoiceId(
  invoiceId: string,
  pageNumber?: number 
): Promise<FindResults<InvoiceProductsDocument[]>> {
  //await new Promise((r) => setTimeout(r, 1000))
  try {
    const result = await find<InvoiceProductsDocument>(
      COLLECTIONS.INVOICE_PRODUCTS, 
      { invoiceId }, 
      pageNumber ? { size: 25, number: pageNumber } : undefined
    )
    return result.data ? result : { data: [], pages_number: 0 }
  } catch (error) {
    throw handleError(error)
  }
}