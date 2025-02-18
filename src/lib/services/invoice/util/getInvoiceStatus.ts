import { Invoice, InvoiceDocument } from "@lib/db/schemas/invoice/Invoice"
import INVOICE_STATUS from "../interfaces/InvoiceStatus"

/**
  * @param object InvoiceDocument 
 * @returns string InvoiceStatus
 */
export default function getInvoiceStatus(object: InvoiceDocument | Invoice): INVOICE_STATUS {
  if (object.status) return object.status
  if (object.value && object.value <= 0) return INVOICE_STATUS.CREATED
  if (object.isPaid) return INVOICE_STATUS.PAID
  if (!object.isPaid ) return INVOICE_STATUS.DEBT
  return INVOICE_STATUS.CREATED
}