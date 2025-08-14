import find, { Page } from "@lib/db/repositories/find";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { MigrationDocument } from "@lib/db/schemas/migration/Migration";
import handleError from "@lib/util/error/handleError";

export default async function getMigrations(filter: Partial<MigrationDocument>, page?: Page) {
  try {
    const result = await find<MigrationDocument>(
      COLLECTIONS.MIGRATIONS, 
      filter, 
      page
    )
    console.log(result)
    return result
  } catch (error) {
    throw handleError(error)
  }
}