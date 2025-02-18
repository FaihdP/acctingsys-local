import { InvoiceDocument } from "@lib/db/schemas/invoice/Invoice";
import saveInvoices, { SaveResult } from "@lib/services/invoice/saveInvoices";
import { MappedObject } from "@ui/table/interfaces/Row";
import getInvoiceProductsToSave from "./getInvoiceProductsToSave";
import saveInvoiceProducts from "@lib/services/invoiceProduct/saveInvoiceProducts";
import handleError from "@lib/util/error/handleError";
import deleteInvoices from "@lib/services/invoice/deleteInvoices";
import savePayments from "@lib/services/payment/savePaymets";
import { PaymentType } from "@lib/db/schemas/payment/Payment";
import deleteInvoiceProducts from "@lib/services/invoiceProduct/deleteInvoiceProducts";
import deletePayments from "@lib/services/payment/deletePayments";
import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus";

export default async function handleSaveInvoice(invoice: InvoiceDocument, invoiceProducts: Map<string, MappedObject>) {
  let savedInvoice: SaveResult | void = undefined
  let savedInvoiceProducts: SaveResult | void = undefined
  let savedPayment: SaveResult | void = undefined
  try {
    savedInvoice = await saveInvoices([invoice])

    if (savedInvoice && invoiceProducts.size > 0) {
      savedInvoiceProducts = await saveInvoiceProducts(
        getInvoiceProductsToSave(
          invoiceProducts, 
          savedInvoice.insertedIds[0].$oid
        )
      )
    }
 
    if (savedInvoice && invoice.isPaid === true && invoice.status !== INVOICE_STATUS.CREATED) {
      savedPayment = await savePayments([{ 
        date: invoice.date,
        invoiceId: savedInvoice.insertedIds[0].$oid,
        isDeleted: false,
        migrated: false,
        type: PaymentType.CASH,
        value: invoice.value
      }])
    }
  } catch (e) {
    if (savedInvoice) deleteInvoices([savedInvoice.insertedIds[0].$oid])
    if (savedInvoiceProducts) deleteInvoiceProducts(savedInvoiceProducts.insertedIds.map((id) => id.$oid))
    if (savedPayment) deletePayments(savedPayment.insertedIds.map(id => id.$oid))
    handleError(e)
  }
}