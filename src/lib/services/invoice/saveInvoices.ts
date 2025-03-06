import save from "@lib/db/repositories/save";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { Invoice } from "@lib/db/schemas/invoice/Invoice";
import handleError from "@lib/util/error/handleError";
import validateInvoice from "./util/validateInvoice";

export interface SaveResult {
  insertedIds: { $oid: string }[]
}

export default async function saveInvoices(invoices: Invoice[]): Promise<SaveResult | void> {
  try {  
    invoices.forEach(validateInvoice)
    return (await save<Invoice>(COLLECTIONS.INVOICES, invoices) as SaveResult)
  } catch (err) {
    throw handleError(err)
  }
}