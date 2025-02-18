import { Invoice } from "@lib/db/schemas/invoice/Invoice";
import { updateObject } from "@lib/services/invoiceProduct/util/getInvoiceProductDifferences";

export default function getInvoiceDifferences(oldInvoice: Invoice, newInvoice: Invoice): updateObject {
  const result: updateObject = { $set: {} }
  if (oldInvoice.date !== newInvoice.date) {
    result.$set.date = newInvoice.date
  }

  if (oldInvoice.isPaid !== newInvoice.isPaid) {
    result.$set.isPaid = newInvoice.isPaid
  }

  // TODO: validate rules to know if add or not to add the status attribute
  if (oldInvoice.status && (oldInvoice.status !== newInvoice.status)) {
    result.$set.status = newInvoice.status
  }

  if (
    newInvoice.personId && (
      newInvoice.personId !== oldInvoice.personId
      || newInvoice.person?.name !== oldInvoice.person?.name
      || newInvoice.person?.lastname !== oldInvoice.person?.lastname
    )
  ) {
    result.$set.personId = newInvoice.personId
    result.$set.person = newInvoice.person
  }

  if (oldInvoice.value !== newInvoice.value) {
    result.$set.value = newInvoice.value
  }

  if (oldInvoice.personId && (!newInvoice.personId && !newInvoice.person)) {
    result.$unset = {}
    result.$unset.personId = ""
    result.$unset.person = ""
  }

  if (oldInvoice.migrated === true) {
    result.$set.migrated = false
  }

  return result
}