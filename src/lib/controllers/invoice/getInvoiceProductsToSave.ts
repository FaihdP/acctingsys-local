import { MappedObject } from "@ui/table/interfaces/Row"

export default function getInvoiceProductsToSave(
  invoiceProducts: Map<string, MappedObject>, 
  invoiceId: string, 
) {
  return Array.from(invoiceProducts.values()).map((invoiceProduct) => {
    return {
      product: { 
        name: invoiceProduct.product.name, 
        value: invoiceProduct.value 
      },
      productId: invoiceProduct.product._id.$oid,
      quantity: parseInt(invoiceProduct.quantity),
      totalValue: invoiceProduct.totalValue,
      invoiceId
    }
  })
}