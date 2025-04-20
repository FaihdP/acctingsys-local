import MongoDocument from "@schemas/common/MongoDocument"

export default interface MigrationExpense {
  migrationId: string
  expenseId: string
  migrated: boolean
  error?: string
  title: string
  description?: string
}

export interface MigrationExpenseDocument extends MigrationExpense, MongoDocument {}