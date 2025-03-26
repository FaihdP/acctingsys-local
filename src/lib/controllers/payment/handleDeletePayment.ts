import deleteByUpdatePayments from "@lib/services/payment/deleteByUpdatePayments";
import handleError from "@lib/util/error/handleError";

export default async function handleDeletePayment(paymentId: string) {
  try {
    return await deleteByUpdatePayments([paymentId])
  } catch (error) {
    throw handleError(error)
  }
}
