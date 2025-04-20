import find from "@lib/db/repositories/find";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import INVOICE_STATUS from "../invoice/interfaces/InvoiceStatus";
import Invoice from "@lib/api/interfaces/Invoice";
import handleError from "@lib/util/error/handleError";
import { InvoiceDocument } from "@lib/db/schemas/invoice/Invoice";
import { getDateObjectFromString } from "@lib/util/time";

export default async function getInvoicesToMigrate(): Promise<Invoice[]> {
  try {
    const invoices = (await find<InvoiceDocument>(
      COLLECTIONS.INVOICES, 
      {
        status: { $in: [INVOICE_STATUS.DEBT, INVOICE_STATUS.PAID] },
        migrated: false,
        isDeleted: false,
        value: { $gt: 0 },
      },
      undefined,
      undefined,
      {
        _id: 1,
        status: 1,
        value: 1,
        date: 1,
        type: 1,
        person: 1,
      }
    )).data

    return invoices.map((invoice) => {
      return {
        InvoiceID: invoice._id.$oid,
        date: getDateObjectFromString(invoice.date),
        value: invoice.value,
        type: invoice.type,
        status: invoice.status,
        person: invoice.person,
      } as Invoice
    })
  } catch (error) {
    throw handleError(error)
  }
} 