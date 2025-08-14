import { Row } from "../interfaces/Row";
import { Column, ColumType } from "../interfaces/Table";

function validateCell(value: any, column: Column): string | null {
  if (!value) if (column.required) return "Campo obligatorio"
  if (!column.required && !value) return null

  switch (column.type) {
    case ColumType.TEXT:
      // Without validation
      break
    case ColumType.CURRENCY:
      if (!/^\d+$/.test(value)) return "Debe ser un número"
      if (value <= 0) return "Debe ser mayor que 0"
      break
    case ColumType.NUMBER:
      if (!/^\d+$/.test(value)) return "Debe ser un número"
      if (value <= 0) return "Debe ser mayor que 0"
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

export default async function validateRow(row: Row, columns: Column[]): Promise<Map<string, string>> {
  const errors = new Map()

  await Promise.all(
    columns.map(
      async (column) => {
        let errorMessage;
        if (column.validator) errorMessage = await column.validator(row)
        if (!errorMessage) errorMessage = validateCell(row.value[column.tag], column)
        if (errorMessage) errors.set(column.tag, errorMessage)
      }
    )
  )

  return errors
}