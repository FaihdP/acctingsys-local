import find from "@lib/db/repositories/find";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { PaymentDocument } from "@lib/db/schemas/payment/Payment";

export default async function updatePayment(invoiceId: string) {
  try {
    const savedPayment = await find<PaymentDocument>(
      COLLECTIONS.PAYMENTS,
      {}
    )
  } catch (error) {
    
  }
}