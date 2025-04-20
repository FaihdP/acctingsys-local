import MongoDocument from "@schemas/common/MongoDocument"

export enum MIGRATION_STATUS {
  PROCESSING = "PROCESSING",
  PENDING = "PENDING",	
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  UNCOMPLETED = "UNCOMPLETED",
}

export default interface Migration {
  date: string
  startDate?: string
  status: MIGRATION_STATUS
  invoices: number
  payments: number
  expenses: number
}

export interface MigrationDocument extends Migration, MongoDocument {}