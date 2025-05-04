import find from "@lib/db/repositories/find";
import { CategoryDocument } from "@lib/db/schemas/category/Category";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import handleError from "@lib/util/error/handleError";

export default async function getCategories() {
  try {
    return await find<CategoryDocument>(COLLECTIONS.CARTEGORIES, {})
  } catch (error) {
    throw handleError(error)
  }
}