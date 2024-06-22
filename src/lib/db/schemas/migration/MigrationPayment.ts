export default interface MigrationPayment {
  migrationId: string
  paymentId: string
  migrated: boolean
  error?: string
}