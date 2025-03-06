import save from "@lib/db/repositories/save"
import COLLECTIONS from "@lib/db/schemas/common/Collections"
import { InvoiceProducts } from "@lib/db/schemas/invoice/InvoiceProducts"
import handleError from "@lib/util/error/handleError"
import { SaveResult } from "../invoice/saveInvoices"
import validateInvoiceProduct from "./util/validateInvoiceProduct"

export default async function saveInvoiceProducts(invoiceProducts: InvoiceProducts[]): Promise<SaveResult | void> {
  try {
    invoiceProducts.forEach(validateInvoiceProduct)
    return (await save<InvoiceProducts>(COLLECTIONS.INVOICE_PRODUCTS, invoiceProducts) as SaveResult)
  } catch (err) {
    throw handleError(err)
  }
}