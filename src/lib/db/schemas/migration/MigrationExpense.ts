export default interface MigrationExpense {
  migrationId: string
  expenseId: string
  migrated: boolean
  error?: string
}