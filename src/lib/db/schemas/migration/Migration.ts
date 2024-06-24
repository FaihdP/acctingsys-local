import MongoDocument from "@schemas/common/MongoDocument"

export enum MigrationStatus {
  PROCESSING,
  PENDING,
  COMPLETED
}

export default interface Migration {
  date: string
  status: MigrationStatus
  invoices: number
  payments: number
  expenses: number
}

export interface MigrationDocument extends Migration, MongoDocument {}