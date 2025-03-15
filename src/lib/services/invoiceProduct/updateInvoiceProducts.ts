import handleError from "@lib/util/error/handleError";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { InvoiceProductUpdateOptionsWithId } from "./util/getInvoiceProductsDifferences";
import update from "@lib/db/repositories/update";
import { InvoiceProductDocument } from "@lib/db/schemas/invoice/InvoiceProducts";

export default async function updateInvoiceProducts(invoiceProductsUpdates: InvoiceProductUpdateOptionsWithId[]) {
  try {
    for (const invoiceProductUpdate of invoiceProductsUpdates) {
      await update<InvoiceProductDocument>(
        COLLECTIONS.INVOICE_PRODUCTS, 
        { _id: { $oid: invoiceProductUpdate.invoiceProductId } }, 
        { $set: invoiceProductUpdate.$set, $unset: invoiceProductUpdate.$unset }
      )
    }
  } catch (error) {
    throw handleError(error)
  }
}