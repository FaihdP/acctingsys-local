import { InvoiceProducts } from "@lib/db/schemas/invoice/InvoiceProducts"

export interface updateObject {
  $set?: any, 
  $unset?: any
}

export default function getInvoiceProductDifferences(
  oldInvoiceProduct: InvoiceProducts, 
  newInvoiceProduct: InvoiceProducts
): updateObject {
  const result: updateObject = {}
  
  if ((newInvoiceProduct.product?.name && newInvoiceProduct.product?.value) && newInvoiceProduct.productId) {
    if (
      newInvoiceProduct.productId !== oldInvoiceProduct.productId 
      || newInvoiceProduct.product?.name !== oldInvoiceProduct.product?.name
      || newInvoiceProduct.product?.value != oldInvoiceProduct.product?.value
    ) {
      if (!result.$set) result.$set = {}
      result.$set.productId = newInvoiceProduct.productId
      result.$set.product = newInvoiceProduct.product
    }
  } else {
    if ((oldInvoiceProduct.productId && oldInvoiceProduct.product)) {
      if (!result.$unset) result.$unset = {}
      result.$unset.productId = ""
      result.$unset.product = ""
    }
  }

  if (oldInvoiceProduct.totalValue !== newInvoiceProduct.totalValue) {
    if (!result.$set) result.$set = {}
    result.$set.totalValue = newInvoiceProduct.totalValue
  }

  if (newInvoiceProduct.quantity) {
    if (newInvoiceProduct.quantity !== oldInvoiceProduct.quantity) {
      if (!result.$set) result.$set = {}
      result.$set.quantity = newInvoiceProduct.quantity
    }
  } else {
    if (oldInvoiceProduct.quantity) {
      if (!result.$unset) result.$unset = {}
      result.$unset.quantity = ""
    }
  }

  return result
}