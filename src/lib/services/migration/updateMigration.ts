import MongoUpdateOptions from "@lib/db/interfaces/MongoUpdateOptions";
import update from "@lib/db/repositories/update";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { MigrationDocument } from "@lib/db/schemas/migration/Migration";
import handleError from "@lib/util/error/handleError";

export default async function updateMigration(migrationId: string, migration: MongoUpdateOptions<MigrationDocument>) {
  try {
    return await update<MigrationDocument>(
      COLLECTIONS.MIGRATIONS, 
      { _id: { $oid: migrationId } }, 
      migration
    )
  } catch (error) {
    throw handleError(error)
  }
}