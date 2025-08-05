import { INVOICE_LOG_ACTION } from "@lib/db/schemas/invoice/InvoiceLog";
import getConfigValue from "@lib/services/config/getConfigValue";
import { ConfigTags } from "@lib/services/config/util/ConfigTags";
import deleteByUpdateInvoices from "@lib/services/invoice/deleteByUpdateInvoices";
import saveInvoiceLog from "@lib/services/invoiceLog/saveInvoiceLog";
import deleteByUpdatePayments from "@lib/services/payment/deleteByUpdatePayments";
import getPayments from "@lib/services/payment/getPayments";
import updateProductQuantity from "@lib/services/product/updateProductQuantity";
import handleError from "@lib/util/error/handleError";
import { ERRORS } from "./handleSaveInvoice";
import getInvoiceProductsByInvoiceId from "@lib/services/invoiceProduct/getInvoiceProductsByInvoiceId";

// TODO: add sign operator 
export default async function handleDeleteInvoice(invoiceIds: string[], userId: string) {

  const shouldUpdateProductQuantity = (await getConfigValue(ConfigTags.UPDATE_PRODUCT_QUANTITY))
  if (shouldUpdateProductQuantity) {
    try {
      for (const invoiceId of invoiceIds) {
        const invoiceProducts = (await getInvoiceProductsByInvoiceId(invoiceId)).data
        await Promise.all(
          invoiceProducts.map(async (invoiceProduct) => {
            if (!invoiceProduct.productId || !invoiceProduct.quantity) return
            await updateProductQuantity(invoiceProduct.productId, parseInt(invoiceProduct.quantity.toString()))
          })
        )
      }
    } catch (e: unknown) {
      throw {
        type: ERRORS.PRODUCT_QUANTITY,
        error: (e as Error).message
      }
    }
  }

  try {
    await deleteByUpdateInvoices(invoiceIds)
    for (const invoiceId of invoiceIds) {
      await saveInvoiceLog(INVOICE_LOG_ACTION.DELETE, "", invoiceId, userId)
      const paymentIds = (await getPayments({ invoiceId, isDeleted: false }))?.data.map((payment) => payment._id.$oid)
      if (paymentIds && paymentIds.length > 0) await deleteByUpdatePayments(paymentIds)
    }
  } catch (err) {
    const message = handleError(err)
    // TODO: validate how get the invoiceId
    for (const invoiceId of invoiceIds) saveInvoiceLog(INVOICE_LOG_ACTION.DELETE_ERROR, message, invoiceId, userId)
    throw message
  }
} 
 