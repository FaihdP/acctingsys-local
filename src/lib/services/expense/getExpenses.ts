import find, { FindResults } from "@lib/db/repositories/find"
import COLLECTIONS from "@lib/db/schemas/common/Collections"
import { ExpenseDocument } from "@lib/db/schemas/expense/Exepense"
import handleError from "@lib/util/error/handleError"

export default async function getExpenses(
  filters: any, 
  pageNumber?: number
): Promise<FindResults<ExpenseDocument[]>> {
  try {
    const result = await find<ExpenseDocument>(
      COLLECTIONS.EXPENSES, 
      filters, 
      pageNumber ? { size: 25, number: pageNumber } : undefined
    )
    return result.data ? result : { data: [], pages_number: 0, total_records: 0 }
  } catch (error) {
    throw handleError(error)
  }
}