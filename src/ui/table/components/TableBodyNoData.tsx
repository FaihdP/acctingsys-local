import React from 'react'
import { useTable } from '../hooks/useTable'

export default function TableBodyNoData() {
  const { getColumnsNumber } = useTable()

  return (
    <tbody>
      <tr>
        <td 
          colSpan={getColumnsNumber()}
          className="text-center text-base h-[300px]"
        >
          No hay datos para mostrar
        </td>
      </tr>
    </tbody>
  )
}
