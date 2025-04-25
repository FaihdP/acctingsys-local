import find, { FindResults } from "@lib/db/repositories/find"
import COLLECTIONS from "@lib/db/schemas/common/Collections"
import MigrationInvoice from "@lib/db/schemas/migration/MigrationInvoice"
import handleError from "@lib/util/error/handleError"

export default async function getMigrationInvoicesById(migrationId: string): Promise<FindResults<MigrationInvoice[]>> {
  try {
    const invoices = await find<MigrationInvoice>(COLLECTIONS.MIGRATION_INVOICES, { migrationId: migrationId })
    return invoices
  } catch (error) {
    throw handleError(error)
  }
}