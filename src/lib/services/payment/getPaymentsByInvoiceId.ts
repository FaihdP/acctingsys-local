import find, { FindResults } from "@lib/db/repositories/find";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { InvoiceProductDocument } from "@lib/db/schemas/invoice/InvoiceProducts";
import { PaymentDocument } from "@lib/db/schemas/payment/Payment";
import handleError from "@lib/util/error/handleError";

export default async function getPaymentsByInvoiceId(
  invoiceId: string, 
  options?: Partial<InvoiceProductDocument>
): Promise<FindResults<PaymentDocument[]>> {
  const filter = options ? { ...options } : { isDeleted: false }
  try {
    const result = await find<PaymentDocument>(
      COLLECTIONS.PAYMENTS, 
      { 
        ...filter, 
        invoiceId 
      }, 
      undefined
    )
    return result.data ? result : { data: [], pages_number: 0 }
  } catch (error) {
    throw handleError(error)
  }
}