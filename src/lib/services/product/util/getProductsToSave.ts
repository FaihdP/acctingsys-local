import { Product } from "@lib/db/schemas/product/Product"
import { ProductDocument } from "@lib/db/schemas/product/Product"

type ProductType = Product | ProductDocument

export default function getProductsToSave(
  products: ProductType[],
  isUpdate: boolean,
): ProductType[] {
  return products.map(product => {
    const user: any = product.user
    const productToSave: Product & { _id?: { $oid: string }, __v?: number } = {
      name: product.name,
      isDeleted: false,
      userId: user.userId,
      user: {
        name: user.name,
        lastname: user.lastname,
      }
    }

    if (product.value) productToSave.value = parseInt(product.value.toString())
    if (product.quantity) productToSave.quantity = parseInt(product.quantity.toString())

    if (product.category) {
      const category: any = product.category
      productToSave.categoryId = category._id?.$oid
      productToSave.category = {
        name: category.name,
        fontColor: category.fontColor,
        backgroundColor: category.backgroundColor,
      }
    }

    if (isUpdate) {
      if ('_id' in product && product._id) productToSave._id = { $oid: product._id.$oid }
      if ('__v' in product) productToSave.__v = product.__v
    }

    return productToSave
  })
}