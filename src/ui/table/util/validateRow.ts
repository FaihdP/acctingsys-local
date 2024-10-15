import { Row } from "../interfaces/Row";
import { Column, ColumType } from "../interfaces/Table";

function validateCell(value: any, column: Column): string | null {
  if (!value) {
    if (column.required) return "Campo obligatorio"
    if (!column.required) return null
  }
  if (!column.required && !value) return null
  switch (column.type) {
    case ColumType.TEXT:
      // Without validation
      break
    case ColumType.CURRENCY || ColumType.NUMBER:
      if (!/^[0-9]/.test(value)) return "Debe ser un número"
      break
    case ColumType.DATE:
      // Without validation
      break
    case ColumType.SELECT:
      // Without validation
      break
    case ColumType.OBJECT:
      // Without validation
      break
    case ColumType.LIST:
      // Without validation
      break
  }
  return null
}

export default function validateRow(row: Row, columns: Column[]): Map<string, string> {
  const errors = new Map()

  columns.map(
    (column) => {
      const error = validateCell(row.value[column.tag], column)
      if (error) errors.set(column.tag, error)
    }
  )

  return errors
}