import { Invoice } from "@lib/db/schemas/invoice/Invoice";
import handleError from "@lib/util/error/handleError";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import validateInvoice from "./util/validateInvoice";
import update from "@lib/db/repositories/update";
import { updateObject } from "../invoiceProduct/util/getInvoiceProductDifferences";

export default async function updateInvoice(key: string, updateInvoiceObject: updateObject): Promise<any> {
  try {
    return await update(COLLECTIONS.INVOICES, { _id: { $oid: key } }, updateInvoiceObject)
  } catch (error) {
    throw handleError(error)
  }
}