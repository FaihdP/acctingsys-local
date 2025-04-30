import MongoUpdateOptions from "@lib/db/interfaces/MongoUpdateOptions";
import update from "@lib/db/repositories/update";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { MigrationExpenseDocument } from "@lib/db/schemas/migration/MigrationExpense";
import handleError from "@lib/util/error/handleError";

export default async function updateMigrationExpense(
  migrationExpenseId: string, 
  migrationExpense: MongoUpdateOptions<MigrationExpenseDocument>
) {
  try {
    return await update<MigrationExpenseDocument>(
      COLLECTIONS.MIGRATION_EXPENSES, 
      { _id: { $oid: migrationExpenseId } }, 
      migrationExpense
    )
  } catch (error) {
    throw handleError(error)
  }
}