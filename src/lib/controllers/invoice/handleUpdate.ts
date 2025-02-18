import { InvoiceDocument } from "@lib/db/schemas/invoice/Invoice";
import updateInvoice from "@lib/services/invoice/updateInvoices";
import updateInvoiceProducts from "@lib/services/invoiceProduct/updateInvoiceProducts";
import handleError from "@lib/util/error/handleError";
import { MappedObject } from "@ui/table/interfaces/Row";
import getInvoiceProductsToUpdate from "./getInoviceProductsToUpdate";
import getPaymentsByInvoiceId from "@lib/services/payment/getPaymentsByInvoiceId";
import updatePaymentByInvoice from "./updatePaymentByInvoice";
import find from "@lib/db/repositories/find";
import getInvoiceDifferences from "@lib/services/invoice/util/getInvoiceDifferences";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import validateInvoice from "@lib/services/invoice/util/validateInvoice";

export default async function handleUpdateInvoice(
  invoice: InvoiceDocument, 
  invoiceProducts: Map<string, MappedObject>
) {
  // TODO: add delete funcionality
  try {
    const savedInvoice = (await find<InvoiceDocument>(COLLECTIONS.INVOICES, { _id: { $oid: invoice._id.$oid } })).data[0]
    const updateInvoiceObject = getInvoiceDifferences(savedInvoice, invoice)
    //validateAdvices()

    if (updateInvoiceObject.$set || updateInvoiceObject.$unset) {
      validateInvoice(invoice)
      await updateInvoice(invoice._id.$oid, updateInvoiceObject)
    }

    const invoiceProductsSaved = getInvoiceProductsToUpdate(invoice._id.$oid, invoiceProducts)
    if (invoiceProducts.size > 0) {
      await updateInvoiceProducts(invoiceProductsSaved)
    }

    const payments = await getPaymentsByInvoiceId(invoice._id.$oid)
    if (payments.data.length > 0) {
      if (payments.data.length === 1 && invoice.isPaid === true) {
        await updatePaymentByInvoice(invoice._id.$oid, payments.data[0], invoice)
      } else { 
        //TODO: make advice  
      }  
    } 
  } catch (error) {
    handleError(error)
  }
} 