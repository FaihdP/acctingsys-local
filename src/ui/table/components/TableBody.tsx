'use client'

import TableProps, { TableConfigHeaderProps } from "@ui/table/interfaces/Table";
import { MappedObject, Row } from "@ui/table/interfaces/Row";
import TableRow from "./TableRow";

interface TableBodyProps { 
  header: TableConfigHeaderProps, 
  actions: TableProps["config"]["actions"],
  data: Map<string, MappedObject>,
  onEditRow: (rowIndex: string) => void,
  onCancelEditRow: (rowIndex: string, newRow?: boolean) => void
  onSelectRow: (rowIndex: string) => void
}

export default function TableBody({ 
  header, 
  actions,
  data, 
  onEditRow,
  onCancelEditRow,
  onSelectRow
}: TableBodyProps) {
  return (
    <tbody>
      { 
        Array
          .from(data, ([key, value]) => { return {key, value} })
          .map((row: Row) => 
            <TableRow 
              key={row.key}
              header={header} 
              actions={actions} 
              row={row} 
              onEditRow={onEditRow}
              onCancelEditRow={onCancelEditRow} 
              onSelectRow={onSelectRow} 
            />
          )
      }
    </tbody>
  )
}