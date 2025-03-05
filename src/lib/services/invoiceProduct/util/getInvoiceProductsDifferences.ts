import { InvoiceProductsNulleableId } from "@lib/services/invoiceProduct/util/getInoviceProductsToUpdate"
import MongoUpdateOptions from "@lib/db/interfaces/MongoUpdateOptions"
import { InvoiceProducts, InvoiceProductsDocument } from "@lib/db/schemas/invoice/InvoiceProducts"

export type InvoiceProductId = { invoiceProductId: string }

export type InvoiceProductUpdateOptions = MongoUpdateOptions<InvoiceProducts>

export type InvoiceProductUpdateOptionsWithId = InvoiceProductUpdateOptions & InvoiceProductId

export type invoiceProductsDifferences = {
  toSave: InvoiceProducts[]
  toDelete: InvoiceProductId[],
  toUpdate: InvoiceProductUpdateOptionsWithId[] 
}

function getInvoiceProductDifferences(
  oldInvoiceProduct: InvoiceProducts, 
  newInvoiceProduct: InvoiceProducts
): InvoiceProductUpdateOptions {
  const result: MongoUpdateOptions<InvoiceProducts> = {}
  if ((newInvoiceProduct.product?.name 
    //&& newInvoiceProduct.product?.value
  ) && newInvoiceProduct.productId) {
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

export default function getInvoiceProductsDifferences(
  oldInvoiceProducts: InvoiceProductsDocument[], 
  newInvoiceProducts: InvoiceProductsNulleableId[]
): invoiceProductsDifferences {
  const result: invoiceProductsDifferences = {
    toSave: [],
    toUpdate: [],
    toDelete: []
  }

  newInvoiceProducts.forEach((newInvoiceProduct) => {
    if (!newInvoiceProduct._id) result.toSave.push(newInvoiceProduct)
  })
  
  for (let i = 0; i < oldInvoiceProducts.length; i++) {
    const oldInvoiceProduct = oldInvoiceProducts[i]
    const newInvoiceProduct = newInvoiceProducts.find(
      (newInvoiceProduct) => oldInvoiceProduct._id.$oid === newInvoiceProduct._id?.$oid  
    )
    
    if (!newInvoiceProduct) {
      result.toDelete.push({ invoiceProductId: oldInvoiceProduct._id.$oid })
    } else {
      const updateInvoiceProduct = getInvoiceProductDifferences(oldInvoiceProduct, newInvoiceProduct)
      if (updateInvoiceProduct.$set || updateInvoiceProduct.$unset) {
        result.toUpdate.push({ invoiceProductId: oldInvoiceProduct._id.$oid, ...updateInvoiceProduct })
      }
    }
  }

  return result
}