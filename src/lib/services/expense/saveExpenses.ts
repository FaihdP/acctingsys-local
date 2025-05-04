import save from "@lib/db/repositories/save"
import COLLECTIONS from "@lib/db/schemas/common/Collections"
import Expense from "@lib/db/schemas/expense/Exepense"
import handleError from "@lib/util/error/handleError"
import validateExpense from "./util/validateExpense"

export default async function saveExpenses(expenses: Expense[]) {
  try {
    expenses.forEach(validateExpense)
    return await save<Expense>(COLLECTIONS.EXPENSES, expenses)
  } catch (error) {
    throw handleError(error)
  }
}

