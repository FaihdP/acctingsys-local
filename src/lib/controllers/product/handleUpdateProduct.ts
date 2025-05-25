import { ProductDocument } from "@lib/db/schemas/product/Product";
import getProducts from "@lib/services/product/getProducts";
import updateProduct from "@lib/services/product/updateProduct";
import getProductDifferences from "@lib/services/product/util/getProductDifferences";
import handleError from "@lib/util/error/handleError";

export default async function handleUpdateProduct(product: ProductDocument) {
  try {
    const oldProduct = (await getProducts({ _id: { $oid: product._id.$oid } })).data[0]
    if (oldProduct) {
      const productDifferences = getProductDifferences(product, oldProduct)
      console.log(productDifferences)
      await updateProduct(oldProduct._id.$oid, productDifferences)
    }
  } catch (error) {
    throw handleError(error)
  }  
}
