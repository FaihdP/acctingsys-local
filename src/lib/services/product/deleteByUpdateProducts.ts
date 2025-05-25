import update from "@lib/db/repositories/update";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { ProductDocument } from "@lib/db/schemas/product/Product";
import handleError from "@lib/util/error/handleError";

export default async function deleteByUpdateProducts(productIds: string[]) {
  try {
    for (let i = 0; i < productIds.length; i++) {
      const productId = productIds[i];
      await update<ProductDocument>(
        COLLECTIONS.PRODUCTS, 
        { _id: { $oid: productId } },
        { $set: { isDeleted: true } }
      )
    }
  } catch (err) {
    handleError(err)
  }
}