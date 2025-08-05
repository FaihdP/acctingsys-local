import update from "@lib/db/repositories/update";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { ProductDocument } from "@lib/db/schemas/product/Product";
import handleError from "@lib/util/error/handleError";
import getProducts from "./getProducts";

/**
 * Updates the quantity of a product
 * @param productId The id of the product
 * @param quantity The quantity to add or remove (positive or negative)
 */
export default async function updateProductQuantity(
  productId: string,
  quantity: number,
) {
  try {
    const product = (await getProducts({ _id: { $oid: productId } })).data[0]
    console.log(product)
    console.log(quantity)
    if (!product || !product.quantity && typeof product.quantity !== "number") {
      throw new Error("El producto no tiene una cantidad definida.")
    }

    if (product.quantity + quantity < 0) {
      throw new Error(`La cantidad del producto ${product.name} es insuficiente. Cantidad actual: ${product.quantity}`)
    }

    await update<ProductDocument>(
      COLLECTIONS.PRODUCTS,
      { _id: { $oid: productId } },
      { $inc: { quantity: quantity } }
    )
  } catch (err: unknown) {
    throw err
  }
}