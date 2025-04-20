import save from "@lib/db/repositories/save";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import MigrationExpense from "@lib/db/schemas/migration/MigrationExpense";
import handleError from "@lib/util/error/handleError";

export default async function saveMigrationExpense(migrationExpenses: MigrationExpense[]) {
  try {
    return await save<MigrationExpense>(COLLECTIONS.MIGRATION_EXPENSES, migrationExpenses)
  } catch (error) {
    throw handleError(error)
  }
}