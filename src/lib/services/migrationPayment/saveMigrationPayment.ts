import save from "@lib/db/repositories/save";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import MigrationPayment from "@lib/db/schemas/migration/MigrationPayment";
import handleError from "@lib/util/error/handleError";

export default async function saveMigrationPayment(migrationPayements: MigrationPayment[]) {
  try {
    return await save<MigrationPayment>(COLLECTIONS.MIGRATION_PAYMENTS, migrationPayements)
  } catch (error) {
    throw handleError(error)
  }
}