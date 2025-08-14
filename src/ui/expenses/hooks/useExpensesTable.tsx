import { useContext, useEffect, useRef, useState } from "react"

import getExpenses from "@lib/services/expense/getExpenses"
import { TableConfigProps } from "@ui/table/interfaces/Table"
import { useCallback } from "react"
import { MappedObject } from "@ui/table/interfaces/Row"
import useDebounce from "@ui/core/hooks/useDebounce"
import DEBOUNCE_TIME from "@ui/core/constants/DebounceTime"
import EXPENSES_TABLE_COLUMNS from "../constants/ExpensesTableColumns"
import mapData from "@ui/table/util/mapData"
import Expense from "@lib/db/schemas/expense/Exepense"
import IUseExpensesTable from "../interfaces/UseExpensesTable"
import { SessionContext } from "@ui/session/hooks/SessionProvider"
import handleSaveExpense from "@lib/controllers/expense/handleSaveExpense"
import handleDeleteExpense from "@lib/controllers/expense/handleDeleteExpense"
import handleUpdateExpense from "@lib/controllers/expense/handleUpdateExpense"
import getMongoFilter from "@lib/util/getMongoFilter"
const DEFAULT_EXPENSES_FILTER: Partial<Expense> = { isDeleted: false }

export default function useExpensesTable(): IUseExpensesTable {
  const { user } = useContext(SessionContext)
  const [expenses, setExpenses] = useState<Map<string, MappedObject> | null>(null)
  const [pageSelected, setPageSelected] = useState<number>(1)
  const pagesNumber = useRef<number>(1)
  const totalRecords = useRef<number>(0)
  
  const [expensesFilter, setExpensesFilter] = useState<string>("")
  const debouncedExpensesFilter = useDebounce(expensesFilter, DEBOUNCE_TIME)
  
  const fetchExpenses = useCallback(async () => {
    let result;
    result = await getExpenses(
      debouncedExpensesFilter 
        ? getMongoFilter(debouncedExpensesFilter, ["date", "title", "description", "value"], DEFAULT_EXPENSES_FILTER, ["user.name", "user.lastname"]) 

        : DEFAULT_EXPENSES_FILTER, 
      pageSelected
    )
    pagesNumber.current = result.pages_number
    totalRecords.current = result.total_records
    setExpenses(mapData(result.data)) 
  }, [pageSelected, debouncedExpensesFilter])
  
  useEffect(() => { fetchExpenses() }, [fetchExpenses])

  const userColumn = EXPENSES_TABLE_COLUMNS.find((expenseColumn) => expenseColumn.tag === 'user')
  if (userColumn) {
    userColumn.defaultValue = {
      name: user.name,
      lastname: user.lastname,
      userId: user.id
    }
  }

  const expensesTableConfig: TableConfigProps = {
    actions: {
      onAdd: async (data: any) => await handleSaveExpense(data),
      onEdit: async (_: string, data: any) => await handleUpdateExpense(data),
      onDelete: async (_, data: any) => await handleDeleteExpense(data._id.$oid)
    },
    header: {
      columns: EXPENSES_TABLE_COLUMNS,
      picker: true,
      options: { onEdit: true }
    }
  }

  return {
    expenses, setExpenses,
    pageSelected, setPageSelected,
    pagesNumber,
    expensesFilter, setExpensesFilter,
    debouncedExpensesFilter,
    expensesTableConfig,
    totalRecords
  }
}
