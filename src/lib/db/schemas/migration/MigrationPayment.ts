import MongoDocument from "@schemas/common/MongoDocument"

export default interface MigrationPayment {
  migrationId: string
  paymentId: string
  migrated: boolean
  error?: string
}

export interface MigrationPaymentDocument extends MigrationPayment, MongoDocument {}
