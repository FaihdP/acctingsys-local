import save from "@lib/db/repositories/save";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { InvoiceDocument } from "@lib/db/schemas/invoice/Invoice";
import handleError from "@lib/util/error/handleError";
import validateInvoice from "./util/validateInvoice";

export interface SaveResult {
  insertedIds: { $oid: string }[]
}

export default async function saveInvoices(invoices: InvoiceDocument[]): Promise<SaveResult | void> {
  try {  
    invoices.forEach(validateInvoice)
    const invoiceToSave: InvoiceDocument[] = invoices.map((item: any) => {
      delete item._id
      return item
    })

    return (await save<InvoiceDocument>(COLLECTIONS.INVOICES, invoiceToSave) as SaveResult)
  } catch (err) {
    throw handleError(err)
  }
}