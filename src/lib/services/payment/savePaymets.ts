import COLLECTIONS from "@lib/db/schemas/common/Collections"
import { SaveResult } from "../invoice/saveInvoices"
import Payment from "@lib/db/schemas/payment/Payment"
import handleError from "@lib/util/error/handleError"
import save from "@lib/db/repositories/save"
import validatePayment from "./util/validatePayment"

export default async function savePayments(payments: Payment[]): Promise<SaveResult | void> {
  try {
    payments.forEach(validatePayment)
    return (await save<Payment>(COLLECTIONS.PAYMENTS, payments) as SaveResult)
  } catch (err) {
    throw handleError(err)
  }
} 