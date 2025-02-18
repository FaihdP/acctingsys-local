import update from "@lib/db/repositories/update";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { InvoiceDocument } from "@lib/db/schemas/invoice/Invoice";
import handleError from "@lib/util/error/handleError";

export default async function deleteByUpdateInvoices(invoiceIds: string[]) {
  try {
    for (let i = 0; i < invoiceIds.length; i++) {
      const invoiceId = invoiceIds[i];
      await update<InvoiceDocument>(
        COLLECTIONS.INVOICES, 
        { _id: { $oid: invoiceId } },
        { $set: { isDeleted: true } }
      )
    }
  } catch (err) {
    handleError(err)
  }
}