import MongoUpdateOptions from "@lib/db/interfaces/MongoUpdateOptions";
import { PaymentDocument } from "@lib/db/schemas/payment/Payment";

export default function getPaymentDifferences(newPayment: PaymentDocument, oldPayment: PaymentDocument) {
  const result: MongoUpdateOptions<PaymentDocument> = {}
  result.$set = {}

  if (newPayment.bank) { 
    if (newPayment.bank !== oldPayment.bank) {
      result.$set.bank = newPayment.bank
    }
  } else if (oldPayment.bank) {
    if (!result.$unset) result.$unset = {}
    result.$unset.bank = ""
  }

  if (newPayment.date !== oldPayment.date) {
    result.$set.date = newPayment.date
  }

  if (newPayment.invoiceId) { 
    if (newPayment.invoiceId !== oldPayment.invoiceId) {
      
      result.$set.invoiceId = newPayment.invoiceId
    }
  } else if (oldPayment.invoiceId) {
    if (!result.$unset) result.$unset = {}
    result.$unset.invoiceId = ""
  }

  if (newPayment.isDeleted !== oldPayment.isDeleted) {
    result.$set.isDeleted = newPayment.isDeleted
  }

  if (newPayment.migrated !== oldPayment.migrated) {
    result.$set.isDeleted = newPayment.migrated
  }

  if (newPayment.type !== oldPayment.type) {
    result.$set.type = newPayment.type
  }

  if (newPayment.personId) { 
    if (newPayment.personId !== oldPayment.personId) {
      result.$set.personId = newPayment.personId
    }
  } else if (oldPayment.personId) {
    if (!result.$unset) result.$unset = {}
    result.$unset.personId = ""
  }

  if (newPayment.value !== oldPayment.value) {
    result.$set.value = newPayment.value
  }

  if (oldPayment.migrated === true) {
    result.$set.migrated = false
  }

  return result
}