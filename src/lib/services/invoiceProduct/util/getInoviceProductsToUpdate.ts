import { InvoiceProducts } from "@lib/db/schemas/invoice/InvoiceProducts"
import { MappedObject } from "@ui/table/interfaces/Row"

export type InvoiceProductsNulleableId = Omit<InvoiceProducts, "_id" | "__v"> & { _id?: { $oid: string }, __v?: number }

export default function getInvoiceProductsToUpdate(
  invoiceId: string, 
  invoiceProducts: Map<string, MappedObject>, 
): InvoiceProductsNulleableId[] {
  return Array.from(invoiceProducts.values()).map((invoiceProduct) => {
    const result: InvoiceProductsNulleableId = {
      _id: invoiceProduct._id ? { $oid: invoiceProduct._id.$oid } : undefined,
      productId: invoiceProduct.product._id?.$oid || invoiceProduct.productId, 
      product: { 
        name: invoiceProduct.product.name, 
        value: invoiceProduct.value || undefined
      },
      quantity: parseInt(invoiceProduct.quantity),
      totalValue: invoiceProduct.totalValue,
      invoiceId,
      __v: 0
    }

    if (!result.product?.value && !result.product?.name) delete result.product
    if (!result.quantity) delete result.quantity

    return result
  })
}