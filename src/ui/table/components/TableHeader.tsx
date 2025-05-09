import { Column, Option } from "@ui/table/interfaces/Table";
import { useState } from "react";
import { useTable } from "../hooks/useTable";
import { TableActions } from "../hooks/TableReducer";

export default function TableHeader() {
  const { header } = useTable()
  const { picker, columns, options } = header
  const [ allRowsSelected, setAllRowsSelected ] = useState(false)

  const { tableDispatch } = useTable()

  const handleSelectAllRows = (allRowsSelected: boolean) => {
    tableDispatch({ type: TableActions.SELECT_ALL_ROWS, payload: allRowsSelected })
  }

  return (
    <thead 
      className="
        shadow-[0_1px_3px_-1px_rgba(0,0,0,0.5)] 
        sticky
        top-0
        bg-white 
        text-left
      "
    >
      <tr className="h-[35px]">
        { 
          picker && 
            <th className="text-center w-20">
              <label className="table-picker">
                <input 
                  type="checkbox" 
                  onChange={() => {
                    handleSelectAllRows(!allRowsSelected)
                    setAllRowsSelected(!allRowsSelected)
                  }}
                />
                <span className="shadow-[0_0_3px_0px_rgba(0,0,0,5)]"></span>
              </label>
            </th> 
        }
        { 
          columns.map(
            (column: Column, index: number) => {
              let style: any = {}
              if (column.width) style.width = column.width + "px"
              if (column.minWidth) style.minWidth = column.minWidth + "px"
              return (
                <th key={index} style={style}>
                  {column.label}
                </th>
              )
            }
          ) 
        }
        { 
          options &&
            <th className="text-center w-[150px]">Opciones</th>
        }
      </tr>
    </thead>
  )
}