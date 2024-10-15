'use client'

import Image from "next/image"
import TableProps, { TableConfigHeaderProps } from "@ui/table/interfaces/Table";
import tableEditIcon from "@public/dashboard/table_edit.svg"
import tableAcceptIcon from "@public/dashboard/table_accept.svg"
import tableCancelIcon from "@public/dashboard/table_cancel.svg"
import TableCell from "../components/TableCell";
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