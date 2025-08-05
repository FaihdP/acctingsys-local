import MongoUpdateOptions from "@lib/db/interfaces/MongoUpdateOptions"
import { ExpenseDocument } from "@lib/db/schemas/expense/Exepense"

export default function getExpenseDifferences(newExpense: ExpenseDocument, oldExpense: ExpenseDocument) {
  const result: MongoUpdateOptions<ExpenseDocument> = {}
  result.$set = {}

  if (newExpense.value !== oldExpense.value) {
    result.$set.value = parseInt(newExpense.value.toString())
  }

  if (newExpense.date !== oldExpense.date) {
    result.$set.date = newExpense.date
  }

  if (newExpense.description !== oldExpense.description) {
    result.$set.description = newExpense.description
  }

  if (newExpense.title !== oldExpense.title) {
    result.$set.title = newExpense.title
  } 

  if (newExpense.isDeleted !== oldExpense.isDeleted) {
    result.$set.isDeleted = newExpense.isDeleted
  }

  if (oldExpense.migrated === true) {
    result.$set.migrated = false
  }
    
  return result
}

