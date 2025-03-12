import find, { FindResults } from "@lib/db/repositories/find"
import COLLECTIONS from "@lib/db/schemas/common/Collections"
import { PaymentDocument } from "@lib/db/schemas/payment/Payment"
import handleError from "@lib/util/error/handleError"

export default async function getPayments(
  filters: any, 
  pageNumber?: number
): Promise<FindResults<PaymentDocument[]>> {
  //await new Promise((r) => setTimeout(r, 1000))
  try {
    const result = await find<PaymentDocument>(
      COLLECTIONS.PAYMENTS, 
      filters, 
      pageNumber ? { size: 25, number: pageNumber } : undefined
    )
    return result.data ? result : { data: [], pages_number: 0 }
  } catch (error) {
    throw handleError(error)
  }
}