import handleError from "@lib/util/error/handleError";
import post from "../methods/post";
import Expense from "../interfaces/Expense";

export interface ExpenseResponse {
  ExpenseID: string
  statusCode: number
  message?: string
}

export default async function saveExpenses(branchId: string, expenses: Expense[]): Promise<ExpenseResponse[]> {
  try {
    return await post("/expenses/create", { branchId, documents: expenses })
  } catch (error) {
    throw error as Error
  }
}