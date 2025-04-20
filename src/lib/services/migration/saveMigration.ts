import save from "@lib/db/repositories/save";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import Migration from "@lib/db/schemas/migration/Migration";
import { SaveResult } from "../invoice/saveInvoices";
import handleError from "@lib/util/error/handleError";

export default async function saveMigration(migration: Migration) {
  try {
    return (await save<Migration>(COLLECTIONS.MIGRATIONS, [migration]) as SaveResult)
  } catch (error) {
    throw handleError(error)
  }
}