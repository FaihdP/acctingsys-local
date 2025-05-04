import { ExpenseDocument } from "@lib/db/schemas/expense/Exepense";
import getExpenses from "@lib/services/expense/getExpenses";
import updateExpense from "@lib/services/expense/updateExpense";
import getExpenseDifferences from "@lib/services/expense/util/getExpenseDifferences";
import handleError from "@lib/util/error/handleError";

export default async function handleUpdateExpense(expense: ExpenseDocument) {
  try {
    const oldExpense = (await getExpenses({ _id: { $oid: expense._id.$oid } })).data[0]
    if (oldExpense) {
      const expenseDifferences = getExpenseDifferences(expense, oldExpense)
      console.log(expenseDifferences)
      await updateExpense(oldExpense._id.$oid, expenseDifferences)
    }
  } catch (error) {
    throw handleError(error)
  }
}
