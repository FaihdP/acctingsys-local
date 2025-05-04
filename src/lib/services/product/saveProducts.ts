import save from "@lib/db/repositories/save";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { Product } from "@lib/db/schemas/product/Product";
import handleError from "@lib/util/error/handleError";
import validateProduct from "./util/validateProduct";

export default async function saveProducts(products: Product[]) {
  try {
    products.forEach(validateProduct)
    return await save<Product>(COLLECTIONS.PRODUCTS, products)
  } catch (error) {
    throw handleError(error)
  }
}