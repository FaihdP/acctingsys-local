'use client'

import { Row } from "@ui/table/interfaces/Row";
import TableRow from "./TableRow";
import { useTable } from "../hooks/useTable";

export default function TableBody() {
  const { data } = useTable()

  return (
    <tbody>
      { 
        Array
          .from(data.map || [], ([key, value]) => { return {key, value} })
          .map((row: Row) => 
            <TableRow key={row.key} row={row}/>
          )
      }
    </tbody>
  )
}