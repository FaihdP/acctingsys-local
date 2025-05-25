import MongoUpdateOptions from "@lib/db/interfaces/MongoUpdateOptions";
import update from "@lib/db/repositories/update";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { ProductDocument } from "@lib/db/schemas/product/Product";
import handleError from "@lib/util/error/handleError";

export default async function updateProduct(
  productId: string, 
  productUpdateObject: MongoUpdateOptions<ProductDocument>
) {
  try {
    await update<ProductDocument>(COLLECTIONS.PRODUCTS, { _id: { $oid: productId } }, productUpdateObject)
  } catch (error) {
    throw handleError(error)
  }
}