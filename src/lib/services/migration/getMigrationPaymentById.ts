import find, { FindResults } from "@lib/db/repositories/find"
import COLLECTIONS from "@lib/db/schemas/common/Collections"
import MigrationPayment from "@lib/db/schemas/migration/MigrationPayment"
import handleError from "@lib/util/error/handleError"

export default async function getMigrationPaymentsById(
  migrationId: string
): Promise<FindResults<MigrationPayment[]>> {
  try {
    const payments = await find<MigrationPayment>(COLLECTIONS.MIGRATION_PAYMENTS, { migrationId: migrationId })
    return payments
  } catch (error) {
    throw handleError(error)
  }
}