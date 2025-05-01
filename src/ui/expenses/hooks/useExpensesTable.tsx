import { useContext } from "react"

import { useEffect } from "react"

import { useState } from "react"

import { useRef } from "react"

import getExpenses from "@lib/services/expense/getExpenses"
import getInvoiceMongoFilter from "@lib/services/invoice/util/getInvoiceMongoFilter"
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

const DEFAULT_EXPENSES_FILTER: Partial<Expense> = { isDeleted: false }

export default function useExpensesTable(): IUseExpensesTable {
  const { user} = useContext(SessionContext)
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
        ? getInvoiceMongoFilter(debouncedExpensesFilter, DEFAULT_EXPENSES_FILTER) 
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
      onEdit: async (id: string, data: any) => {
        console.log(id, data)
      },
      onAdd: async (data: any) => {
        console.log(data)
      },
      onDelete: async (id: string, data: any) => {
        console.log(id, data)
      }
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
