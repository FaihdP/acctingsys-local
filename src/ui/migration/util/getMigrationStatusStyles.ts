import { MIGRATION_STATUS } from "@lib/db/schemas/migration/Migration"
import { MIGRATION_STATUS_STYLES } from "../constants/MigrationStatusTags"

export default function getMigrationStatusStyles(migrationStatus: MIGRATION_STATUS) {
  return MIGRATION_STATUS_STYLES[migrationStatus] || { backgroundColor: '#E2E8F0', color: '#7A7A7A' }
}