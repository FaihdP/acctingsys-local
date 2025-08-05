import { Invoice, INVOICE_TYPE } from "@lib/db/schemas/invoice/Invoice";
import saveInvoices, { SaveResult } from "@lib/services/invoice/saveInvoices";
import { MappedObject } from "@ui/table/interfaces/Row";
import getInvoiceProductsToSave from "../../services/invoiceProduct/util/getInvoiceProductsToSave";
import saveInvoiceProducts from "@lib/services/invoiceProduct/saveInvoiceProducts";
import handleError from "@lib/util/error/handleError";
import deleteInvoices from "@lib/services/invoice/deleteInvoices";
import savePayments from "@lib/services/payment/savePaymets";
import { PAYMENT_TYPE } from "@lib/db/schemas/payment/Payment";
import deleteInvoiceProducts from "@lib/services/invoiceProduct/deleteInvoiceProducts";
import deletePayments from "@lib/services/payment/deletePayments";
import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus";
import saveInvoiceLog from "@lib/services/invoiceLog/saveInvoiceLog";
import { INVOICE_LOG_ACTION } from "@lib/db/schemas/invoice/InvoiceLog";
import updateProductQuantity from "@lib/services/product/updateProductQuantity";
import getConfigValue from "@lib/services/config/getConfigValue";
import { ConfigTags } from "@lib/services/config/util/ConfigTags";

export enum ERRORS {
  PRODUCT_QUANTITY = "PRODUCT_QUANTITY_ERROR"
}

export default async function handleSaveInvoice(invoice: Invoice, invoiceProducts: Map<string, MappedObject>) {
  let savedInvoiceId: string | undefined
  let savedInvoiceProducts: SaveResult | void = undefined
  let savedPayment: SaveResult | void = undefined

  const shouldUpdateProductQuantity = (await getConfigValue(ConfigTags.UPDATE_PRODUCT_QUANTITY))
  if (shouldUpdateProductQuantity) {
    try {
      await Promise.all(
        Array.from(invoiceProducts.values()).map(async (invoiceProduct) => {
          const product = invoiceProduct.product
          if (!product || !invoiceProduct.quantity) return
          await updateProductQuantity(
            product._id.$oid, 
            (invoice.type === INVOICE_TYPE.SALE ? -1 : 1) * parseInt(invoiceProduct.quantity)
          )
        })
      )
    } catch (e: unknown) {
      throw {
        type: ERRORS.PRODUCT_QUANTITY,
        error: (e as Error).message
      }
    }
  }

  try {
    savedInvoiceId = (await saveInvoices([invoice])).insertedIds[0].$oid

    await saveInvoiceLog(
      INVOICE_LOG_ACTION.ADD,
      undefined,
      savedInvoiceId,
      invoice.userId
    )

    if (invoiceProducts.size > 0) {
      const invoiceProductsToSave = getInvoiceProductsToSave(
        invoiceProducts, 
        savedInvoiceId
      )

      savedInvoiceProducts = await saveInvoiceProducts(invoiceProductsToSave)

      for (const mappedInvoiceProduct of invoiceProducts) {
        const invoiceProduct = mappedInvoiceProduct[1]
        saveInvoiceLog(
          INVOICE_LOG_ACTION.ADD_INVOICE_PRODUCT,
          "Add invoice product " + JSON.stringify(invoiceProduct),
          savedInvoiceId,
          invoice.userId
        )
      }
    }
 
    if (savedInvoiceId && invoice.isPaid === true && invoice.status !== INVOICE_STATUS.CREATED) {
      savedPayment = await savePayments([{ 
        date: invoice.date,
        invoiceId: savedInvoiceId,
        isDeleted: false,
        migrated: false,
        type: PAYMENT_TYPE.CASH,
        value: invoice.value,
        userId: invoice.userId,
        user: invoice.user,
      }])
    }
  } catch (e: any) {
    if (e.type === ERRORS.PRODUCT_QUANTITY) {
      console.log(e)
      throw e
    }

    const message = handleError(e)
    // TODO: validate if its necessary delete all documents created
    if (savedInvoiceId) deleteInvoices([savedInvoiceId])
    if (savedInvoiceProducts) deleteInvoiceProducts(savedInvoiceProducts.insertedIds.map((id) => id.$oid))
    if (savedPayment) deletePayments(savedPayment.insertedIds.map(id => id.$oid))
    await saveInvoiceLog(
      INVOICE_LOG_ACTION.ADD_ERROR, 
      message, 
      savedInvoiceId || "",
      invoice.userId
    )
    throw message
  }
}