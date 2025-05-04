import handleError from "@lib/util/error/handleError";
import deleteByUpdateExpense from "@lib/services/expense/deleteByUpdateExpense";

export default async function handleDeleteExpense(expenseId: string) {
  try {
    await deleteByUpdateExpense([expenseId])
  } catch (error) {
    throw handleError(error)
  }
}