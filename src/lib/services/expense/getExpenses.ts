import find, { FindResults } from "@lib/db/repositories/find"
import COLLECTIONS from "@lib/db/schemas/common/Collections"
import { ExpenseDocument } from "@lib/db/schemas/expense/Exepense"
import handleError from "@lib/util/error/handleError"
import FIND_DOCUMENTS_SIZE from "@ui/core/constants/FIndDocumentsSize"

export default async function getExpenses(
  filters: any, 
  pageNumber?: number
): Promise<FindResults<ExpenseDocument[]>> {
  try {
    const result = await find<ExpenseDocument>(
      COLLECTIONS.EXPENSES, 
      filters, 
      pageNumber ? { size: FIND_DOCUMENTS_SIZE, number: pageNumber } : undefined
    )
    return result
  } catch (error) {
    throw handleError(error)
  }
}