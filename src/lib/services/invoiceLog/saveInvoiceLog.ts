import save from "@lib/db/repositories/save";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import InvoiceLog, { INVOICE_LOG_ACTION } from "@lib/db/schemas/invoice/InvoiceLog";
import { formatDate, getDateTime } from "@lib/util/time";

export default async function saveInvoiceLog(
  invoiceLogAction: INVOICE_LOG_ACTION, 
  message: string,
  invoiceId: string,
  userId: string,
) {
  await save<InvoiceLog>(COLLECTIONS.INVOICE_LOG, [{
    action: invoiceLogAction,
    date: formatDate(getDateTime()),
    description: message,
    invoiceId: invoiceId,
    userId
  }])
}