import Expense from "@lib/api/interfaces/Expense"
import find from "@lib/db/repositories/find"
import COLLECTIONS from "@lib/db/schemas/common/Collections"
import { ExpenseDocument } from "@lib/db/schemas/expense/Exepense"
import handleError from "@lib/util/error/handleError"
import { getDateObjectFromString } from "@lib/util/time"

export default async function getExpensesToMigrate() {
  try {
    const expenses = (await find<ExpenseDocument>(
      COLLECTIONS.EXPENSES,
      {
        migrated: false,
        isDeleted: false,
        value: { $gt: 0 },
      },
      undefined,
      undefined,
      {
        _id: 1,
        value: 1,
        date: 1,
        title: 1,
        description: 1,
      }
    )).data

    return expenses.map((expense) => {
      return {
        expenseId: expense._id.$oid,
        date: getDateObjectFromString(expense.date),
        title: expense.title,
        description: expense.description,
        value: expense.value
      } as Expense
    })

  } catch (error) {
    throw handleError(error)
  }
}