import { Column, Option } from "@ui/table/interfaces/Table";
import { useState } from "react";

export default function TableHeader(
  { 
    picker, 
    columns, 
    options,
    onSelectAllRows
  }: {
    picker: boolean
    options?: {
      onEdit: boolean
      others?: Option[]
    }
    columns: Column[]
    onSelectAllRows: (allRowsSelected: boolean) => void
  }
) {
  const [allRowsSelected, setAllRowsSelected] = useState(false)

  return (
    <thead 
      className="
        shadow-[0_1px_3px_-1px_rgba(0,0,0,0.5)] 
        sticky 
        bg-white 
        text-left
      ">
      <tr className="h-[35px]">
        { 
          picker && 
            <th className="text-center min-w-[30px]">
              <label className="table-picker">
                <input 
                  type="checkbox" 
                  onChange={() => {
                    onSelectAllRows(!allRowsSelected)
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