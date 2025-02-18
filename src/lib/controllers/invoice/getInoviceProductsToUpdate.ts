import { InvoiceProducts, InvoiceProductsDocument } from "@lib/db/schemas/invoice/InvoiceProducts"
import { MappedObject } from "@ui/table/interfaces/Row"

export default function getInvoiceProductsToUpdate(
  invoiceId: string, 
  invoiceProducts: Map<string, MappedObject>, 
) {
  return Array.from(invoiceProducts.values()).map((invoiceProduct) => {
    const result: any = {
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