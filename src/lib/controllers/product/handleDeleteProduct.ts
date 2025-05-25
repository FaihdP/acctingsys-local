import deleteByUpdateProducts from "@lib/services/product/deleteByUpdateProducts";
import handleError from "@lib/util/error/handleError";

export default async function handleDeleteProduct(productIds: string[], userId: string): Promise<void> {
  try {
    // TODO: Save log with userId
    await deleteByUpdateProducts(productIds)
  } catch(err) {
    throw handleError(err)
  }
}