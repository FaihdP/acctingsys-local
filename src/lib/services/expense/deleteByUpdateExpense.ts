import update from "@lib/db/repositories/update";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { ExpenseDocument } from "@lib/db/schemas/expense/Exepense";
import handleError from "@lib/util/error/handleError";

export default async function deleteByUpdateExpense(expensesIds: string[]) {
  try {
    for (const expenseId of expensesIds) {
      await update<ExpenseDocument>(
        COLLECTIONS.EXPENSES, 
        { _id: { $oid: expenseId } }, 
        { $set: { isDeleted: true } }
      )
    }
  } catch (error) {
    throw handleError(error)
  }
}
