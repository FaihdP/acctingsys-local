'use client'

import { MouseEvent, useCallback, useEffect, useRef, useState } from "react"
import { MappedObject } from "@ui/table/interfaces/Row"
import TableProps, { Column } from "@ui/table/interfaces/Table"
import mapData from "../util/mapData"
import TableHeader from "../components/TableHeader"
import TableBody from "../components/TableBody"
import TableBodySkeleton from "../components/TableBodySkeleton"
import TableFooter from "../components/TableFooter"

const getColumnsNumber = (columns: Column[], picker: boolean, options: any): number => { 
  let columnsNumber: number = columns.length
  if (picker) columnsNumber++
  if (Object.keys(options).length > 0) columnsNumber++
  return columnsNumber
}

export default function Table({
  getData,
  config,
  filters
}: TableProps) {
  const { header, modifiers, actions } = config
  const [data, setData] = useState<Map<string, MappedObject> | null>(null)
  const dataBackup = useRef<Map<string, MappedObject>>(new Map())
  const [pageSelected, setPageSelected] = useState<number>(1)
  const pagesNumber = useRef<number>(1)
  
  const fetchData = useCallback(async () => {
    const result = await getData(filters, pageSelected)
    // pagesNumber.current = result.pages_number
    setData(mapData(result.data))
  }, [getData, filters, pageSelected])

  useEffect(() => { fetchData() }, [fetchData])

  const handleAddRowDefault = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (!data) return
    setData(
      (new Map(data)).set(
        "row_" + (data.size), 
        { isEditable: true, isSelected: false, isNewRow: true }
      )
    )
  }

  const handleEditRow = (rowIndex: string) => {
    const newMap = new Map(data)
    const row = newMap.get(rowIndex)
    if (!row) return
    dataBackup.current.set(rowIndex, { ...row })
    row.isEditable = !row.isEditable
    setData(newMap)
  }

  const handleCancelEditRow = (rowIndex: string, newRow?: boolean) => {
    setData((prevData) => {
      const newMap = new Map(prevData)
      if (newRow) {
        newMap.delete(rowIndex)
      } else {
        const row = newMap.get(rowIndex)
        if (row) row.isEditable = false
        if (dataBackup.current) {
          const rowBackup = dataBackup.current.get(rowIndex)
          if (rowBackup) {
            newMap.set(rowIndex, rowBackup)
          }
        }
      } 
      return newMap
    })
  }

  const handleSelectRow = (rowIndex: string) => {
    const newMap = new Map(data)
    const row = newMap.get(rowIndex)
    if (!row) return
    row.isSelected = !row.isSelected
    setData(newMap)
  }

  const handleSelectAllRows = (allRowsSelected: boolean) => {
    const newMap = new Map(data)
    newMap.forEach((value) => {
      if (value.isSelected === allRowsSelected) return
      value.isSelected = !value.isSelected
    })
    setData(newMap)
  }

  const handleDeleteRowDefault = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const newMap = new Map(data)
    if (!data) return
    data.forEach((row, key) => {
      if (row.isSelected) {
        newMap.delete(key)
        if (actions.onDelete) actions.onDelete(key)
      }
    })
    setData(newMap)
  }

  const handlePageSelectedChange = (newPageSelected: number) => {
    if (newPageSelected < 1 || newPageSelected > pagesNumber.current) return
    setPageSelected(newPageSelected)
  }

  return (
    <div 
      className="
        flex
        flex-col
        h-[90%]
        shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
        rounded-lg
        bg-[#F4F4F4]
        overflow-auto
      "
    >
      <div className="overflow-y-auto">
        <table 
          className="w-full" 
          style={{ fontSize: "12px" }}
        >
          <TableHeader 
            picker={header.picker} 
            columns={header.columns}
            options={header.options}
            onSelectAllRows={handleSelectAllRows}
          />
          { !data && <TableBodySkeleton columnsNumber={getColumnsNumber(header.columns, header.picker, header.options)}/> }
          { 
            (data && data.size > 0) &&
              <TableBody 
                header={header} 
                actions={actions}
                data={data}
                onEditRow={handleEditRow}
                onCancelEditRow={handleCancelEditRow}
                onSelectRow={handleSelectRow}
              /> 
          }
          {
            (data && data.size === 0) &&
              <tbody>
                <tr>
                  <td 
                    colSpan={getColumnsNumber(header.columns, true, header.options)}
                    className="text-center text-base h-[300px]"
                  >
                    No hay datos para mostrar
                  </td>
                </tr>
              </tbody>
          }


        </table>
      </div>
      <TableFooter 
        onAdd={modifiers.onAddRow || handleAddRowDefault} 
        onDelete={modifiers.onDeleteRow || handleDeleteRowDefault} 
        pageSelected={pageSelected}
        pagesNumber={pagesNumber.current}
        onPageSelectedChange={handlePageSelectedChange}
      />
    </div>
  )
}