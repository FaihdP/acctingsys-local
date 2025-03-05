import handleError from "@lib/util/error/handleError";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { InvoiceProductUpdateOptionsWithId } from "./util/getInvoiceProductsDifferences";
import update from "@lib/db/repositories/update";

export default async function updateInvoiceProducts(invoiceProductsUpdates: InvoiceProductUpdateOptionsWithId[]) {
  try {
    for (let i = 0; i < invoiceProductsUpdates.length; i++) {
      const invoiceProduct = invoiceProductsUpdates[i]
      await update(
        COLLECTIONS.INVOICE_PRODUCTS, 
        { _id: { $oid: invoiceProduct.invoiceProductId } }, 
        { $set: invoiceProduct.$set, $unset: invoiceProduct.$unset }
      )
    }
  } catch (error) {
    throw handleError(error)
  }
}