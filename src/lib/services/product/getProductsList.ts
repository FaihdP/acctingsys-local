import handleError from "@lib/util/error/handleError";
import getProducts from "./getProducts";

export default async function getProductsList(filters: any) {
  try {
    return await getProducts({ ...filters, isDeleted: false }, undefined, { name: 1, value: 1 })
  } catch (error) {
    throw handleError(error)
  }
}