'use client'

import { MouseEvent, useCallback, useEffect, useRef, useState } from "react"
import TableHeader from "../components/TableHeader"
import TableBody from "./TableBody"
import TableBodySkeleton from "../components/TableBodySkeleton"
import TableFooter from "../components/TableFooter"
import TableProps, { Column, MappedObject } from "@ui/table/interfaces/Table"

const mapData = (data: any): Map<string, MappedObject> => {
  const map = new Map()
  data.forEach((row: any, index: number) => {
    row.isSelected = false
    row.isEditable = false
    map.set("row_" + index, row)
  })
  return map
}

const getColumnsNumber = (columns: Column[], picker: boolean, options: any) => { 
  let columnsNumber: number = columns.length
  if (picker) columnsNumber++
  if (Object.keys(options).length > 0) columnsNumber++
  return columnsNumber
}

export default function Table({
  getData,
  config,
}: TableProps) {
  const { header, modifiers, actions } = config
  const [state, setState] = useState<Map<string, MappedObject> | null>(null)
  const oldRow = useRef<MappedObject | null>(null)
  

  // It will only be re-renderize if the dependencies (getData) change.
  // TODO: add filters dependency
  const fetchData = useCallback(async () => {
    const result = await getData()
    setState(mapData(result))
  }, [getData])

  useEffect(() => { fetchData() }, [fetchData])

  const handleAddRowDefault = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (!state) return
    setState(
      (new Map(state)).set(
        "row_" + (state.size), 
        { isEditable: true, isSelected: false, isNewRow: true }
      )
    )
  }

  const hanldeEditRow = (rowIndex: string) => {
    const newMap = new Map(state)
    const row = newMap.get(rowIndex)
    
    if (!row) return

    oldRow.current = { ...row }
    //console.log(oldRow.current)
    row.isEditable = !row.isEditable
    
    setState(newMap)
  }

  const handleCancelEditRow = (rowIndex: string, newRow?: boolean) => {
    const newMap = new Map(state)
    const row = newMap.get(rowIndex)
    if (newRow) {
      newMap.delete(rowIndex)
    } else {
      if (row) row.isEditable = false
      if (oldRow.current) {
        newMap.set(rowIndex, oldRow.current)
      }
    }
    
    setState(newMap)
  }

  const handleSelectRow = (rowIndex: string) => {
    const newMap = new Map(state)
    const row = newMap.get(rowIndex)
    if (!row) return
    row.isSelected = !row.isSelected
    setState(newMap)
  }

  const handleSelectAllRows = (allRowsSelected: boolean) => {
    const newMap = new Map(state)
    newMap.forEach((value) => {
      if (value.isSelected === allRowsSelected) return
      value.isSelected = !value.isSelected
    })
    setState(newMap)
  }

  return (
    <>
      <div 
        className="
          flex
          flex-col
          h-full
          shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
          rounded-lg
          bg-[#F4F4F4]
          overflow-x-auto
        "
      >
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

          { state
              ? <TableBody 
                  header={header} 
                  actions={actions}
                  data={state}
                  onEditRow={hanldeEditRow}
                  onCancelEditRow={handleCancelEditRow}
                  onSelectRow={handleSelectRow}
                /> 
              : <TableBodySkeleton/> }

        </table>
        <TableFooter 
          onAdd={modifiers.onAddRow || handleAddRowDefault} 
          onDelete={modifiers.onDeleteRow} 
        />
      </div>
    </>
  )
}