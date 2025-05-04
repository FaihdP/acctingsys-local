import { Product } from "@lib/db/schemas/product/Product"

export default function getProductsToSave(products: Product[]): Product[] {
  return products.map(product => {
    const user: any = product.user
    const productToSave: Product = {
      name: product.name,
      isDeleted: false,
      userId: user.userId,
      user: {
        name: user.name,
        lastname: user.lastname,
      }
    }

    if (product.value) productToSave.value = parseInt(product.value.toString())
    if (product.quantity) productToSave.value = parseInt(product.quantity.toString())

    if (product.category) {
      const category: any = product.category
      productToSave.categoryId = category._id?.$oid
      productToSave.category = {
        name: category.name,
        fontColor: category.fontColor,
        backgroundColor: category.backgroundColor,
      }
    }

    return productToSave
  })
}