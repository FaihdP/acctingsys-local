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
import { PAYMENT_TYPE } from "@lib/db/schemas/payment/Payment";
import saveInvoiceLog from "@lib/services/invoiceLog/saveInvoiceLog";
import { INVOICE_LOG_ACTION } from "@lib/db/schemas/invoice/InvoiceLog";
import User from "@ui/session/interfaces/User";

export default async function handleUpdateInvoice(
  newData: {
    invoice: InvoiceDocument, 
    invoiceProducts: InvoiceProductsNulleableId[],
    user: User
  },
  options: {  
    shouldSavePayment: boolean,
    shouldRestorePayments: boolean,
  }
) {
  const { invoice, invoiceProducts, user } = newData

  try {
    const oldInvoice = (await find<InvoiceDocument>(COLLECTIONS.INVOICES, { _id: { $oid: invoice._id.$oid } })).data[0]
    const oldInvoiceProducts = (await getInvoiceProductsByInvoiceId(invoice._id.$oid)).data
    const oldPayments = (await getPaymentsByInvoiceId(invoice._id.$oid, {})).data
  
    const updateInvoiceObject = getInvoiceDifferences(oldInvoice, invoice)
    const updateInvoiceProductsObjects = getInvoiceProductsDifferences(oldInvoiceProducts, invoiceProducts)

    if (Object.keys(updateInvoiceObject.$set || updateInvoiceObject.$unset || {}).length > 0) {
      validateInvoice(invoice)
      await updateInvoice(invoice._id.$oid, updateInvoiceObject)
      await saveInvoiceLog(
        INVOICE_LOG_ACTION.UPDATE, 
        "From: " + JSON.stringify(oldInvoice) + ". Update: " + JSON.stringify(updateInvoiceObject),
        invoice._id.$oid,
        user.id
      )
    }
    
    if (updateInvoiceProductsObjects.toSave.length > 0) {
      await saveInvoiceProducts(updateInvoiceProductsObjects.toSave)
      for (const invoiceProduct of updateInvoiceProductsObjects.toSave) {
        saveInvoiceLog(
          INVOICE_LOG_ACTION.ADD_INVOICE_PRODUCT,
          "Add invoice product " + JSON.stringify(invoiceProduct),
          invoice._id.$oid,
          invoice.userId
        )
      }
    }

    if (updateInvoiceProductsObjects.toDelete.length > 0) {
      await deleteInvoiceProducts(
        updateInvoiceProductsObjects.toDelete.map(({ _id }) => _id.$oid)
      )
      for (const invoiceProduct of updateInvoiceProductsObjects.toDelete) {
        saveInvoiceLog(
          INVOICE_LOG_ACTION.DELETE_INVOICE_PRODUCT,
          "Delete invoice product " + JSON.stringify(invoiceProduct),
          invoice._id.$oid,
          invoice.userId
        )
      }
    }

    if (updateInvoiceProductsObjects.toUpdate.length > 0) {
      await updateInvoiceProducts(updateInvoiceProductsObjects.toUpdate)
      for (const invoiceProduct of updateInvoiceProductsObjects.toUpdate) {
        saveInvoiceLog(
          INVOICE_LOG_ACTION.UPDATE_INVOICE_PRODUCT,
          "Update invoice product " + JSON.stringify(invoiceProduct),
          invoice._id.$oid,
          invoice.userId
        )
      }
    }

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
          type: PAYMENT_TYPE.CASH,
          invoiceId: invoice._id.$oid,
          userId: user.id,
          user: {
            name: user.name,
            lastname: user.lastname
          }
        }
      ])
    }

    if (oldPayments.length > 0) {
      if (oldPayments.length === 1) {
        await updatePaymentByInvoice(invoice._id.$oid, oldPayments[0], invoice)
      } else { 
        //TODO: make advice  
      }
    }
  } catch (error) {
    const message = handleError(error)
    await saveInvoiceLog(
      INVOICE_LOG_ACTION.UPDATE_ERROR, 
      message, 
      invoice._id.$oid, 
      invoice.userId
    )
  }
} 