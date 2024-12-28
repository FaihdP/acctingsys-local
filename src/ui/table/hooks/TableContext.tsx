'use client'

import { createContext, Dispatch, MutableRefObject, ReactNode, SetStateAction, useEffect, useReducer, useRef } from "react";
import ITableContext from "../interfaces/TableContext";
import tableReducer, { TableActions } from "./TableReducer";
import { MappedObject } from "../interfaces/Row";
import { TableConfigProps } from "../interfaces/Table";

export const TableContext = createContext({} as ITableContext )

export default function TableProvider(
  { 
    children, 
    initialData 
  }: { 
    children: ReactNode, 
    initialData: { 
      config: TableConfigProps,  
      data: Map<string, MappedObject> | null,
      pageSelected: number
      setPageSelected: Dispatch<SetStateAction<number>>,
      pagesNumber: MutableRefObject<number>
    } 
  }
) {
  const config = useRef<TableConfigProps>(initialData.config)
  const { header, modifiers, actions } = config.current
  const [ data, tableDispatch ] = useReducer(tableReducer, { map: initialData.data})
  const dataBackup = useRef<Map<string, MappedObject>>(new Map())

  const handleAddRow = () => { 
    if (modifiers.onAddRow) return modifiers.onAddRow()
    tableDispatch({ type: TableActions.ADD_ROW, payload: { onAdd: actions.onAdd } })
  }

  const handleDeleteRow = () => {
    if (modifiers.onDeleteRow) return modifiers.onDeleteRow()
    tableDispatch({ type: TableActions.DELETE_ROW, payload: { onDelete: actions.onDelete } })
  }

  const handleEditRow = (rowIndex: string) => {
    tableDispatch({ type: TableActions.EDIT_ROW, payload: { rowIndex, dataBackup } })
  }

  const handleCancelEditRow = (rowIndex: string, newRow?: boolean) => {
    tableDispatch({ type: TableActions.CANCEL_EDIT_ROW, payload: { rowIndex, dataBackup, newRow } })
  }

  const handleSelectRow = (rowIndex: string) => {
    tableDispatch({ type: TableActions.SELECT_ROW, payload: rowIndex })
  }

  const handlePageSelectedChange = (newPageSelected: number) => {
    if (newPageSelected < 1 || newPageSelected > initialData.pagesNumber.current) return
    initialData.setPageSelected(newPageSelected)
  }

  const getColumnsNumber = () => { 
    let columnsNumber: number = header.columns.length
    if (header.picker) columnsNumber++
    if (header.options && Object.keys(header.options).length > 0) columnsNumber++
    return columnsNumber
  }

  useEffect(() => {
    tableDispatch({ type: TableActions.RESET, payload: initialData.data })
  }, [initialData.data])

  return (
    <TableContext.Provider value={{
      header,
      modifiers,
      actions,
      data,
      tableDispatch,
      dataBackup,
      pageSelected: initialData.pageSelected,
      setPageSelected: initialData.setPageSelected,
      pagesNumber: initialData.pagesNumber,
      handleAddRow,
      handleCancelEditRow,
      handleDeleteRow,
      handleEditRow,
      handlePageSelectedChange,
      handleSelectRow,
      getColumnsNumber
    }}>
      { children }
    </TableContext.Provider>
  )
}