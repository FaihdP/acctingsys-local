import update from "@lib/db/repositories/update";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { PaymentDocument } from "@lib/db/schemas/payment/Payment";
import handleError from "@lib/util/error/handleError";

export default async function deleteByUpdatePayments(paymentIds: string[]) {
  try {
    for (let i = 0; i < paymentIds.length; i++) {
      const paymentId = paymentIds[i];
      await update<PaymentDocument>(
        COLLECTIONS.PAYMENTS, 
        { _id: { $oid: paymentId } },
        { $set: { isDeleted: true } }
      )
    }
  } catch (err) {
    handleError(err)
  }
}