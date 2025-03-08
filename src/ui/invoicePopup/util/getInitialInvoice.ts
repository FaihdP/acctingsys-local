import { INVOICE_TYPE, InvoiceDocument } from "@lib/db/schemas/invoice/Invoice";
import { formatDate, getDateTime } from "@lib/util/time";
import User from "@ui/session/interfaces/User";

export default function getInitialInvoice(
  invoiceData: InvoiceDocument | null, 
  invoiceType: INVOICE_TYPE,
  userData: User
): InvoiceDocument {
  const {
    _id = { $oid: "" },
    date = formatDate(getDateTime()),
    value = 0,
    isPaid = true,
    status,
    type = invoiceType,
    userId = userData.id,
    migrated = false,
    isDeleted = false,
  } = invoiceData || {}

  return {
    _id,
    date,
    value,
    isPaid,
    status,
    type,
    userId,
    migrated,
    isDeleted,
    user: {
      name: invoiceData?.user.name || userData.name,
      lastname: invoiceData?.user.lastname || userData.lastname,
    },
    __v: 0
  }
}