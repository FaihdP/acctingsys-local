import Expense from "@lib/db/schemas/expense/Exepense";
import handleError from "@lib/util/error/handleError";
import saveExpenses from "@lib/services/expense/saveExpenses";
import getExpensesToSave from "@lib/services/expense/util/getExpensesToSave";

export default async function handleSaveExpense(expenses: Expense[]) {
  try {
    await saveExpenses(getExpensesToSave(expenses))
  } catch (error) {
    throw handleError(error)
  }
}
