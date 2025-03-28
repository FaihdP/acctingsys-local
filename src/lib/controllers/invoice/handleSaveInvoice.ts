import { Invoice } from "@lib/db/schemas/invoice/Invoice";
import saveInvoices, { SaveResult } from "@lib/services/invoice/saveInvoices";
import { MappedObject } from "@ui/table/interfaces/Row";
import getInvoiceProductsToSave from "../../services/invoiceProduct/util/getInvoiceProductsToSave";
import saveInvoiceProducts from "@lib/services/invoiceProduct/saveInvoiceProducts";
import handleError from "@lib/util/error/handleError";
import deleteInvoices from "@lib/services/invoice/deleteInvoices";
import savePayments from "@lib/services/payment/savePaymets";
import { PAYMENT_TYPE } from "@lib/db/schemas/payment/Payment";
import deleteInvoiceProducts from "@lib/services/invoiceProduct/deleteInvoiceProducts";
import deletePayments from "@lib/services/payment/deletePayments";
import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus";
import saveInvoiceLog from "@lib/services/invoiceLog/saveInvoiceLog";
import { INVOICE_LOG_ACTION } from "@lib/db/schemas/invoice/InvoiceLog";

export default async function handleSaveInvoice(invoice: Invoice, invoiceProducts: Map<string, MappedObject>) {
  let savedInvoice: SaveResult | void = undefined
  let savedInvoiceProducts: SaveResult | void = undefined
  let savedPayment: SaveResult | void = undefined
  try {
    savedInvoice = await saveInvoices([invoice])

    await saveInvoiceLog(
      INVOICE_LOG_ACTION.ADD,
      "",
      savedInvoice.insertedIds[0].$oid,
      invoice.userId
    )

    if (invoiceProducts.size > 0) {
      savedInvoiceProducts = await saveInvoiceProducts(
        getInvoiceProductsToSave(
          invoiceProducts, 
          savedInvoice.insertedIds[0].$oid
        )
      )
      for (const mappedInvoiceProduct of invoiceProducts) {
        const invoiceProduct = mappedInvoiceProduct[1]
        saveInvoiceLog(
          INVOICE_LOG_ACTION.ADD_INVOICE_PRODUCT,
          "Add invoice product " + JSON.stringify(invoiceProduct),
          savedInvoice.insertedIds[0].$oid,
          invoice.userId
        )
      }
    }
 
    if (savedInvoice && invoice.isPaid === true && invoice.status !== INVOICE_STATUS.CREATED) {
      savedPayment = await savePayments([{ 
        date: invoice.date,
        invoiceId: savedInvoice.insertedIds[0].$oid,
        isDeleted: false,
        migrated: false,
        type: PAYMENT_TYPE.CASH,
        value: invoice.value,
        userId: invoice.userId,
        user: invoice.user,
      }])
    }
  } catch (e) {
    const message = handleError(e)
    // TODO: validate if its necessary delete all documents created
    if (savedInvoice) deleteInvoices([savedInvoice.insertedIds[0].$oid])
    if (savedInvoiceProducts) deleteInvoiceProducts(savedInvoiceProducts.insertedIds.map((id) => id.$oid))
    if (savedPayment) deletePayments(savedPayment.insertedIds.map(id => id.$oid))
    await saveInvoiceLog(
      INVOICE_LOG_ACTION.ADD_ERROR, 
      message, 
      savedInvoice ? savedInvoice.insertedIds[0]?.$oid : "", 
      invoice.userId
    )
    throw message
  }
}