import { Invoice, InvoiceDocument } from "@lib/db/schemas/invoice/Invoice";
import handleError from "@lib/util/error/handleError";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import update from "@lib/db/repositories/update";
import MongoUpdateOptions from "@lib/db/interfaces/MongoUpdateOptions";

export default async function updateInvoice(key: string, updateInvoiceObject: MongoUpdateOptions<Invoice>): Promise<any> {
  try {
    return await update<InvoiceDocument>(COLLECTIONS.INVOICES, { _id: { $oid: key } }, updateInvoiceObject)
  } catch (error) {
    throw handleError(error)
  }
}