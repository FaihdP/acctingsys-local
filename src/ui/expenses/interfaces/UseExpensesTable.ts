import { MappedObject } from "@ui/table/interfaces/Row"
import { TableConfigProps } from "@ui/table/interfaces/Table"
import { Dispatch, MutableRefObject, SetStateAction } from "react"

export default interface UseExpensesTable {
  expenses: Map<string, MappedObject> | null
  setExpenses: Dispatch<SetStateAction<Map<string, MappedObject> | null>>
  expensesFilter: string
  setExpensesFilter: Dispatch<SetStateAction<string>>
  pageSelected: number
  setPageSelected: Dispatch<SetStateAction<number>>
  pagesNumber: MutableRefObject<number>
  debouncedExpensesFilter: string
  expensesTableConfig: TableConfigProps
  totalRecords: MutableRefObject<number>
}
