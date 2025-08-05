import { Product } from "@lib/db/schemas/product/Product";
import saveProducts from "@lib/services/product/saveProducts";
import getProductsToSave from "@lib/services/product/util/getProductsToSave";
import handleError from "@lib/util/error/handleError";

export default async function handleSaveProduct(products: Product[]): Promise<any> {
  try {
    await saveProducts(getProductsToSave(products, false))
  } catch (error) {
    throw handleError(error)
  }
}