import save from "@lib/db/repositories/save";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import Payment from "@lib/db/schemas/payment/Payment";
import getPaymentToSave from "@lib/services/payment/util/getPaymentToSave";
import handleError from "@lib/util/error/handleError";

export default async function handleSavePayment(data: Payment[]) {
  try {
    console.log(data)
    const newData = getPaymentToSave(data)
    console.log(newData)
    return await save<Payment>(COLLECTIONS.PAYMENTS, newData)
  } catch (error) {
    throw handleError(error)
  }
}