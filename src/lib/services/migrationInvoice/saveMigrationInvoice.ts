import save from "@lib/db/repositories/save";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import MigrationInvoice from "@lib/db/schemas/migration/MigrationInvoice";
import handleError from "@lib/util/error/handleError";

export default async function saveMigrationInvoice(migrationInvoices: MigrationInvoice[]) {
  try {
    return await save<MigrationInvoice>(COLLECTIONS.MIGRATION_INVOICES, migrationInvoices)
  } catch (error) {
    throw handleError(error)
  }
}