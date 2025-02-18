import { Invoice, InvoiceDocument } from "@lib/db/schemas/invoice/Invoice"
import INVOICE_STATUS from "../interfaces/InvoiceStatus"

export default function validateInvoice(invoice: Invoice | InvoiceDocument) {
  if (!invoice.date) {
    throw new Error("Invoice date is required")
  }

  if (!invoice.userId || !invoice.user) {
    throw new Error("Invoice user is required")
  }

  if (!invoice.type) {
    throw new Error("Invoice type is required")
  }

  if (invoice.isPaid === undefined) {
    throw new Error("Invoice isPaid is required")
  }

  if (invoice.migrated === undefined) {
    throw new Error("Invoice migrated is required")
  }

  if (invoice.isDeleted === undefined) {
    throw new Error("Invoice isDeleted is required")
  }

  if (invoice.migrated === true && invoice.status === INVOICE_STATUS.CREATED) {
    throw new Error("Invoice status cant be CREATED if the invoice has already been migrated")
  }
}