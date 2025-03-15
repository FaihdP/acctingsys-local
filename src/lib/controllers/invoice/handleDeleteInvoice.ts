import { INVOICE_LOG_ACTION } from "@lib/db/schemas/invoice/InvoiceLog";
import deleteByUpdateInvoices from "@lib/services/invoice/deleteByUpdateInvoices";
import saveInvoiceLog from "@lib/services/invoiceLog/saveInvoiceLog";
import deleteByUpdatePayments from "@lib/services/payment/deleteByUpdatePayments";
import getPayments from "@lib/services/payment/getPayments";
import handleError from "@lib/util/error/handleError";

export default async function handleDeleteInvoice(invoiceIds: string[], userId: string) {
  try {
    await deleteByUpdateInvoices(invoiceIds)
    for (const invoiceId of invoiceIds) {
      await saveInvoiceLog(INVOICE_LOG_ACTION.DELETE, "", invoiceId, userId)
      const paymentIds = (await getPayments({ invoiceId, isDeleted: false }))?.data.map((payment) => payment._id.$oid)
      if (paymentIds && paymentIds.length > 0) await deleteByUpdatePayments(paymentIds)
    }
  } catch (err) {
    const message = handleError(err)
    // TODO: validate how get the invoiceId
    for (const invoiceId of invoiceIds) saveInvoiceLog(INVOICE_LOG_ACTION.DELETE_ERROR, message, invoiceId, userId)
    throw message
  }
} 
 