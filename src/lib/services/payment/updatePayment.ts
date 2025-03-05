import MongoUpdateOptions from "@lib/db/interfaces/MongoUpdateOptions";
import update from "@lib/db/repositories/update";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { PaymentDocument } from "@lib/db/schemas/payment/Payment";
import handleError from "@lib/util/error/handleError";

export default async function updatePayment(
  paymentId: string, 
  paymentUpdateObject: MongoUpdateOptions<PaymentDocument>
) {
  try {
    await update<PaymentDocument>(
      COLLECTIONS.PAYMENTS, 
      { _id: { $oid: paymentId } },
      paymentUpdateObject
    )
  } catch (error) {
    throw handleError(error)
  }
}