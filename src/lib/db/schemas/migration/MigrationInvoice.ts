export default interface MigrationInvoice {
  migrationId: string
  invoiceId: string
  migrated: boolean
  error?: string
}