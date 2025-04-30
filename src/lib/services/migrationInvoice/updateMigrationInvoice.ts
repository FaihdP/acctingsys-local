import MongoUpdateOptions from "@lib/db/interfaces/MongoUpdateOptions";
import update from "@lib/db/repositories/update";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { MigrationInvoiceDocument } from "@lib/db/schemas/migration/MigrationInvoice";
import handleError from "@lib/util/error/handleError";

export default async function updateMigrationInvoice(
  migrationInvoiceId: string, 
  migrationInvoice: MongoUpdateOptions<MigrationInvoiceDocument>
) {
  try {
    return await update<MigrationInvoiceDocument>(
      COLLECTIONS.MIGRATION_INVOICES, 
      { _id: { $oid: migrationInvoiceId } }, 
      migrationInvoice
    )
  } catch (error) {
    throw handleError(error)
  }
}