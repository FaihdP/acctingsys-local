import find from "@lib/db/repositories/find";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { InvoiceDocument } from "@lib/db/schemas/invoice/Invoice";
import handleError from "@lib/util/error/handleError";

export default async function getInvoiceList() {
  try {
    const result = (await find<InvoiceDocument>(
      COLLECTIONS.INVOICES, 
      { isDeleted: false },
      { size: 100, number: 1 },
      undefined,
      { _id: 1 }	
    ))

    const invoicesIds = result.data.map(doc => doc._id.$oid)

    return { data: invoicesIds }
  } catch (error) {
    handleError(error)
  }
}