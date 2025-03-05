import MongoUpdateOptions from "@lib/db/interfaces/MongoUpdateOptions";
import { PaymentDocument } from "@lib/db/schemas/payment/Payment";

export default function getPaymentDifferences(newPayment: PaymentDocument, oldPayment: PaymentDocument) {
  const result: MongoUpdateOptions<PaymentDocument> = {}

  if (newPayment.bank) { 
    if (newPayment.bank !== oldPayment.bank) {
      if (!result.$set) result.$set = {}
      result.$set.bank = newPayment.bank
    }
  } else if (oldPayment.bank) {
    if (!result.$unset) result.$unset = {}
    result.$unset.bank = ""
  }

  if (newPayment.date !== oldPayment.date) {
    if (!result.$set) result.$set = {}
    result.$set.date = newPayment.date
  }

  if (newPayment.invoiceId) { 
    if (newPayment.invoiceId !== oldPayment.invoiceId) {
      if (!result.$set) result.$set = {}
      result.$set.invoiceId = newPayment.invoiceId
    }
  } else if (oldPayment.invoiceId) {
    if (!result.$unset) result.$unset = {}
    result.$unset.invoiceId = ""
  }

  if (newPayment.isDeleted !== oldPayment.isDeleted) {
    if (!result.$set) result.$set = {}
    result.$set.isDeleted = newPayment.isDeleted
  }

  if (newPayment.migrated !== oldPayment.migrated) {
    if (!result.$set) result.$set = {}
    result.$set.isDeleted = newPayment.migrated
  }

  if (newPayment.personId) { 
    if (newPayment.personId !== oldPayment.personId) {
      if (!result.$set) result.$set = {}
      result.$set.personId = newPayment.personId
    }
  } else if (oldPayment.personId) {
    if (!result.$unset) result.$unset = {}
    result.$unset.personId = ""
  }

  if (newPayment.value !== oldPayment.value) {
    if (!result.$set) result.$set = {}
    result.$set.value = newPayment.value
  }

  return result
}