import find, { FindResults } from "@lib/db/repositories/find"
import COLLECTIONS from "@lib/db/schemas/common/Collections"
import MigrationExpense from "@lib/db/schemas/migration/MigrationExpense"
import handleError from "@lib/util/error/handleError"

export default async function getMigrationExpensesById(migrationId: string): Promise<FindResults<MigrationExpense[]>> {
  try {
    const expenses = await find<MigrationExpense>(COLLECTIONS.MIGRATION_EXPENSES, { migrationId: migrationId })
    return expenses
  } catch (error) {
    throw handleError(error)
  }
}