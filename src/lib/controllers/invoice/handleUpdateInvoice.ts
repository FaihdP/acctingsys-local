import { InvoiceDocument } from "@lib/db/schemas/invoice/Invoice";
import updateInvoice from "@lib/services/invoice/updateInvoice";
import updateInvoiceProducts from "@lib/services/invoiceProduct/updateInvoiceProducts";
import handleError from "@lib/util/error/handleError";
import { InvoiceProductsNulleableId } from "../../services/invoiceProduct/util/getInoviceProductsToUpdate";
import getPaymentsByInvoiceId from "@lib/services/payment/getPaymentsByInvoiceId";
import updatePaymentByInvoice from "../../services/payment/updatePaymentByInvoice";
import find from "@lib/db/repositories/find";
import getInvoiceDifferences from "@lib/services/invoice/util/getInvoiceDifferences";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import validateInvoice from "@lib/services/invoice/util/validateInvoice";
import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus";
import getInvoiceProductsDifferences from "@lib/services/invoiceProduct/util/getInvoiceProductsDifferences";
import getInvoiceProductsByInvoiceId from "@lib/services/invoiceProduct/getInvoiceProductsByInvoiceId";
import saveInvoiceProducts from "@lib/services/invoiceProduct/saveInvoiceProducts";
import deleteInvoiceProducts from "@lib/services/invoiceProduct/deleteInvoiceProducts";
import deleteByUpdatePayments from "@lib/services/payment/deleteByUpdatePayments";
import updatePayment from "@lib/services/payment/updatePayment";
import getPaymentDifferences from "@lib/services/payment/util/getPaymentDifferences";
import savePayments from "@lib/services/payment/savePaymets";
import { PaymentType } from "@lib/db/schemas/payment/Payment";

export default async function handleUpdateInvoice(
  newData: {
    invoice: InvoiceDocument, 
    invoiceProducts: InvoiceProductsNulleableId[]
  },
  options: {
    shouldSavePayment: boolean,
    shouldRestorePayments: boolean,
  }
) {
  try {
    const { invoice, invoiceProducts } = newData
    
    // console.log("newInvoiceProducts", invoiceProducts)

    const oldInvoice = (await find<InvoiceDocument>(COLLECTIONS.INVOICES, { _id: { $oid: invoice._id.$oid } })).data[0]
    const oldInvoiceProducts = (await getInvoiceProductsByInvoiceId(invoice._id.$oid)).data
    const oldPayments = (await getPaymentsByInvoiceId(invoice._id.$oid, {})).data

    // console.log("oldInvoiceProducts", oldInvoiceProducts)

    const updateInvoiceObject = getInvoiceDifferences(oldInvoice, invoice)
    const updateInvoiceProductsObjects = getInvoiceProductsDifferences(oldInvoiceProducts, invoiceProducts)

    // console.log("updateInvoiceProducts", updateInvoiceProductsObjects)
    
    if (invoice.status === INVOICE_STATUS.CREATED) {
      await deleteByUpdatePayments(
        oldPayments
          .filter((oldPayment) => oldPayment.isDeleted === false)
          .map(({ _id }) => _id.$oid)
      )
    }

    if (
      oldInvoice.status === INVOICE_STATUS.CREATED 
      && invoice.status
      && [INVOICE_STATUS.PAID, INVOICE_STATUS.DEBT].includes(invoice.status)
      && options.shouldRestorePayments
    ) {
      for (const oldPayment of oldPayments) {
        if (oldPayment.isDeleted === true) {
          await updatePayment(
            invoice._id.$oid, 
            getPaymentDifferences({ ...oldPayment, isDeleted: false }, oldPayment)
          )
        }
      }
    }
    
    if (
      oldInvoice.status === INVOICE_STATUS.DEBT 
      && invoice.status === INVOICE_STATUS.PAID 
      && options.shouldSavePayment
    ) {
      await savePayments([
        { 
          date: invoice.date,
          isDeleted: false,
          migrated: false,
          value: invoice.value,
          type: PaymentType.CASH,
          invoiceId: invoice._id.$oid,
        }
      ])
    }

    if (
      Object.keys(updateInvoiceObject.$set || {}).length > 0 
      || Object.keys(updateInvoiceObject.$unset || {}).length > 0
    ) {
      console.log(invoice)
      console.log(updateInvoiceObject)
      validateInvoice(invoice)
      await updateInvoice(invoice._id.$oid, updateInvoiceObject)
    }
    
    if (updateInvoiceProductsObjects.toSave.length > 0) {
      await saveInvoiceProducts(updateInvoiceProductsObjects.toSave)
    }

    if (updateInvoiceProductsObjects.toDelete.length > 0) {
      await deleteInvoiceProducts(
        updateInvoiceProductsObjects.toDelete.map(({ invoiceProductId }) => invoiceProductId)
      )
    }

    if (updateInvoiceProductsObjects.toUpdate.length > 0) {
      await updateInvoiceProducts(updateInvoiceProductsObjects.toUpdate)
    }

    if (oldPayments.length > 0) {
      if (oldPayments.length === 1) {
        await updatePaymentByInvoice(invoice._id.$oid, oldPayments[0], invoice)
      } else { 
        //TODO: make advice  
      }
    }
  } catch (error) {
    throw handleError(error)
  }
} 