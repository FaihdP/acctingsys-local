import { ProductDocument } from "@lib/db/schemas/product/Product";
import MongoUpdateOptions from "@lib/db/interfaces/MongoUpdateOptions";

export default function getProductDifferences(product: ProductDocument, oldProduct: ProductDocument): MongoUpdateOptions<ProductDocument> {
  const result: MongoUpdateOptions<ProductDocument> = {}
  result.$set = {}

  if (product.name !== oldProduct.name) {
    result.$set.name = product.name
  }

  if (product.value !== oldProduct.value) {
    result.$set.value = product.value
  }

  if (product.isDeleted !== oldProduct.isDeleted) {
    result.$set.isDeleted = product.isDeleted
  }

  if (product.quantity !== oldProduct.quantity) {
    result.$set.quantity = product.quantity
  }

  if (
    product.categoryId && (
      product.categoryId !== oldProduct.categoryId
      || product.category?.name !== oldProduct.category?.name
      || product.category?.fontColor !== oldProduct.category?.fontColor
      || product.category?.backgroundColor !== oldProduct.category?.backgroundColor
    )
  ) {
    result.$set.categoryId = product.categoryId
    result.$set.category = product.category
  }

  if (oldProduct.categoryId && (!product.categoryId && !product.category)) {
    result.$unset = {}
    result.$unset.categoryId = ""
    result.$unset.category = ""
  }

  return result
}