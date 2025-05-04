import MongoUpdateOptions from "@lib/db/interfaces/MongoUpdateOptions"
import update from "@lib/db/repositories/update"
import COLLECTIONS from "@lib/db/schemas/common/Collections"
import { ExpenseDocument } from "@lib/db/schemas/expense/Exepense"
import handleError from "@lib/util/error/handleError"

export default async function updateExpense(expenseId: string, expense: MongoUpdateOptions<ExpenseDocument>) { 
  try {
    return await update<ExpenseDocument>(
      COLLECTIONS.EXPENSES, 
      { _id: { $oid: expenseId } }, 
      expense
    )
  } catch (error) {
    throw handleError(error)
  }
}