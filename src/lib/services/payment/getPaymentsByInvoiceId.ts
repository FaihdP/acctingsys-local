import find, { FindResults } from "@lib/db/repositories/find";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { PaymentDocument } from "@lib/db/schemas/payment/Payment";
import handleError from "@lib/util/error/handleError";

export default async function getPaymentsByInvoiceId(invoiceId: string): Promise<FindResults<PaymentDocument[]>> {
  try {
    const result = await find<PaymentDocument>(
      COLLECTIONS.PAYMENTS, 
      { 
        isDeleted: false, 
        invoiceId 
      }, 
      undefined
    )
    return result.data ? result : { data: [], pages_number: 0 }
  } catch (error) {
    throw handleError(error)
  }
}