import handleError from "@lib/util/error/handleError";
import post from "../methods/post";
import Payment from "../interfaces/Payment";

export interface PaymentResponse {
  PaymentID: string
  statusCode: number
  message?: string
}

export default async function savePayments(payments: Payment[]): Promise<PaymentResponse[]> {
  try {
    return await post("/payments/create", payments)
  } catch (error) {
    throw error as Error
  }
}