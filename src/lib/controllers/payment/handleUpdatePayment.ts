import { PaymentDocument } from "@lib/db/schemas/payment/Payment";
import getPayments from "@lib/services/payment/getPayments";
import updatePayment from "@lib/services/payment/updatePayment";
import getPaymentDifferences from "@lib/services/payment/util/getPaymentDifferences";
import handleError from "@lib/util/error/handleError";

export default async function handleUpdatePayment(_: string, newPayment: PaymentDocument) {
  let oldPayment;
  try {
    oldPayment = (await getPayments({ _id: { $oid: newPayment._id.$oid } })).data[0] 
    if (oldPayment) {
      const paymentDifferences = getPaymentDifferences(newPayment, oldPayment)
      console.log(paymentDifferences)
      await updatePayment(oldPayment._id.$oid, paymentDifferences)
    }
  } catch (error) {
    throw handleError(error)
  }
}
