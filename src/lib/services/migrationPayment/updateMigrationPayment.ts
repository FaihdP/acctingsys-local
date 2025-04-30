import MongoUpdateOptions from "@lib/db/interfaces/MongoUpdateOptions";
import update from "@lib/db/repositories/update";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { MigrationPaymentDocument } from "@lib/db/schemas/migration/MigrationPayment";
import handleError from "@lib/util/error/handleError";

export default async function updateMigrationPayment(
  migrationPaymentId: string, 
  migrationPayment: MongoUpdateOptions<MigrationPaymentDocument>
) {
  try {
    return await update<MigrationPaymentDocument>(
      COLLECTIONS.MIGRATION_PAYMENTS, 
      { _id: { $oid: migrationPaymentId } }, 
      migrationPayment
    )
  } catch (error) {
    throw handleError(error)
  }
}