import update from "@lib/db/repositories/update";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { Invoice, InvoiceDocument } from "@lib/db/schemas/invoice/Invoice";
import { PaymentDocument } from "@lib/db/schemas/payment/Payment";
import getPaymentDifferences from "@lib/services/payment/util/getPaymentDifferences";
import handleError from "@lib/util/error/handleError";

export default async function updatePaymentByInvoice(invoiceId: string, payment: PaymentDocument, invoice: InvoiceDocument) {
  const newPayment = { 
    _id: { $oid: payment._id.$oid },
    date: payment.date,
    isDeleted: false,
    migrated: false,
    value: invoice.value,
    type: payment.type,
    bank: payment.bank,
    invoiceId,
    __v: 0,
  }

  try {
    const updatePaymentObject = getPaymentDifferences(newPayment, payment)
    if (updatePaymentObject.$set || updatePaymentObject.$unset) {
      return await update<PaymentDocument>(
        COLLECTIONS.PAYMENTS,
        { _id: { $oid: payment._id.$oid } },
        updatePaymentObject
      )
    }
  } catch (error) {
    throw handleError(error)
  }
}