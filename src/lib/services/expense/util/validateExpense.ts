import Expense from "@lib/db/schemas/expense/Exepense"

export default function validateExpense(expense: Expense) {
  if (!expense.date) {
    throw new Error("Expense date is required")
  }
  if (!expense.value) {
    throw new Error("Expense value is required")
  }
  if (!expense.title) {
    throw new Error("Expense title is required")
  }

  if (expense.migrated === undefined) {
    throw new Error("Expense migrated is required")
  }

  if (expense.isDeleted === undefined) {
    throw new Error("Expense isDeleted is required")
  }

  if (!expense.user || !expense.userId) {
    throw new Error("Expense user is required")
  }
}
