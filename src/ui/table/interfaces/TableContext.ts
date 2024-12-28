import { Dispatch, MutableRefObject, SetStateAction } from "react"
import { TableAction, TableDataState } from "../hooks/TableReducer"
import { TableConfigProps } from "./Table"
import { MappedObject } from "./Row"

export default interface TableContext extends TableConfigProps {
  data: TableDataState
  tableDispatch: Dispatch<TableAction>
  dataBackup: MutableRefObject<Map<string, MappedObject>>
  pageSelected: number
  setPageSelected: Dispatch<SetStateAction<number>>
  pagesNumber: MutableRefObject<number>
  handleAddRow: () => void
  handleDeleteRow: () => void
  handleEditRow: (rowIndex: string) => void
  handleCancelEditRow: (rowIndex: string, newRow?: boolean) => void
  handleSelectRow: (rowIndex: string) => void
  handlePageSelectedChange: (newPageSelected: number) => void
  getColumnsNumber: () => number
}