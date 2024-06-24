import MongoDocument from "@schemas/common/MongoDocument"

export default interface MigrationInvoice {
  migrationId: string
  invoiceId: string
  migrated: boolean
  error?: string
}

export interface MigrationInvoiceDocument extends MigrationInvoice, MongoDocument {}
