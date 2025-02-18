import deleteByUpdateInvoices from "@lib/services/invoice/deleteByUpdateInvoices";
import deleteByUpdatePayments from "@lib/services/payment/deleteByUpdatePayments";
import getPayments from "@lib/services/payment/getPayments";
import handleError from "@lib/util/error/handleError";

export default async function handleDelete(invoiceIds: string[]) {
  try {
    await deleteByUpdateInvoices(invoiceIds)
    for (let i = 0; i < invoiceIds.length; i++) {
      const invoiceId: string = invoiceIds[i];
      const paymentIds = (await getPayments({ invoiceId, isDeleted: false }))?.data.map((payment) => payment._id.$oid)
      if (paymentIds && paymentIds.length > 0) await deleteByUpdatePayments(paymentIds)
    }
  } catch (err) {
    throw handleError(err)
  }
} 
 