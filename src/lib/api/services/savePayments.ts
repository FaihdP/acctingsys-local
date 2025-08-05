import handleError from "@lib/util/error/handleError";
import post from "../methods/post";
import Payment from "../interfaces/Payment";

export interface PaymentResponse {
  PaymentID: string
  statusCode: number
  message?: string
}

export default async function savePayments(branchId: string, payments: Payment[]): Promise<PaymentResponse[]> {
  try {
    return await post("/payments/create", { branchId, documents: payments })
  } catch (error) {
    throw error as Error
  }
}