import { InvoiceProductsDocument } from "@lib/db/schemas/invoice/InvoiceProducts";
import handleError from "@lib/util/error/handleError";
import validateInvoiceProduct from "./util/validateInvoiceProduct";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import find from "@lib/db/repositories/find";
import getInvoiceProductDifferences from "./util/getInvoiceProductDifferences";
import update from "@lib/db/repositories/update";
import saveInvoiceProducts from "./saveInvoiceProducts";

export default async function updateInvoiceProducts(invoiceProducts: InvoiceProductsDocument[]) {
  try {
    for (let i = 0; i < invoiceProducts.length; i++) {
      const invoiceProduct = invoiceProducts[i]
      // TODO: Separate this code to make this function more general
      if (!invoiceProduct._id) {
        validateInvoiceProduct(invoiceProduct)
        console.log("save", invoiceProduct)
        await saveInvoiceProducts([invoiceProduct])
        continue
      }

      const savedInvoiceProduct = (
        await find<InvoiceProductsDocument>(
          COLLECTIONS.INVOICE_PRODUCTS, 
          { _id: { $oid: invoiceProduct._id.$oid } }
        )
      ).data[0]

      const updateInvoiceObject = getInvoiceProductDifferences(savedInvoiceProduct, invoiceProduct)

      if (updateInvoiceObject.$set || updateInvoiceObject.$unset) {
        validateInvoiceProduct(invoiceProduct)
        await update(
          COLLECTIONS.INVOICE_PRODUCTS, 
          { _id: { $oid: invoiceProduct._id.$oid } }, 
          updateInvoiceObject
        )
      }  
    }
  } catch (error) {
    throw handleError(error)
  }
}