import { MIGRATION_STATUS } from "@lib/db/schemas/migration/Migration"
import { MIGRATION_STATUS_TEXTS } from "../constants/MigrationStatusTags"

export default function getMigrationStatusText(migrationStatus: MIGRATION_STATUS) {
  return MIGRATION_STATUS_TEXTS[migrationStatus] || ""
}