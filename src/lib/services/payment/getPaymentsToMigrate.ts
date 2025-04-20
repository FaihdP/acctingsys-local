import Payment from "@lib/api/interfaces/Payment";
import find from "@lib/db/repositories/find";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { PaymentDocument } from "@lib/db/schemas/payment/Payment";
import handleError from "@lib/util/error/handleError";
import { getDateObjectFromString } from "@lib/util/time";

export default async function getPaymentsToMigrate() {
  try {
    const payments = (await find<PaymentDocument>(
      COLLECTIONS.PAYMENTS,
      {
        migrated: false,
        isDeleted: false,
        value: { $gt: 0 },
      },
      undefined,
      undefined,
      {
        _id: 1,
        value: 1,
        date: 1,
        type: 1,
        bank: 1,
      }
    )).data

    return payments.map((payment) => {
      return {
        PaymentID: payment._id.$oid,
        date: getDateObjectFromString(payment.date),
        type: payment.type,
        bank: payment.bank,
        value: payment.value
      } as Payment
    })
  } catch (error) {
    throw handleError(error)
  }
}