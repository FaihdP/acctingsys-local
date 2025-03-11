import { ColumType } from "@ui/table/interfaces/Table"
import { MappedObject } from "@ui/table/interfaces/Row"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import getCell from "../util/getCell"
import getEditableCell from "../util/getEditableCell"
import processRelationship from "../util/processRelationship"
import ColumTypes, { ListColumn, ObjectColumn, SelectColumn } from "../interfaces/ColumTypes"
import useCell from "../hooks/useCell"

interface CellProps { 
  row: MappedObject
  value: any
  column: ColumTypes
  className?: string
  errorMessage?: string,
  updateRow: boolean
  onUpdateRow: () => void
}

export default function TableCell({ 
  row,
  value,
  column,
  className,
  errorMessage,
  updateRow,
  onUpdateRow,
}: CellProps) {
  const { content, setContent, error, setError } = useCell(value, errorMessage)
  const [selected, setSelected] = useState<boolean>(false)
  const [relationship, setRelationship] = useState(null)
  const [filter, setFilter] = useState<string>("")
  const columnTypeHasList = [ColumType.OBJECT, ColumType.SELECT, ColumType.LIST].includes(column.type)

  useEffect(() => { 
    setContent(value) 
    row[column.tag] = value
    setError(errorMessage)
  }, [value, errorMessage, row, column, setContent, setError, updateRow])

  useEffect(() => {
    if (columnTypeHasList) {
      const getRelationship = async () => {
        return await processRelationship(
          column as ObjectColumn | ListColumn | SelectColumn, 
          filter, 
          column.type === ColumType.OBJECT ? column.fields : undefined,
          row?._id?.$oid
        )
      }
      (async () => {
        const result = await getRelationship()
        setRelationship(result)
      })()
    }
  }, [column, filter, row, columnTypeHasList])

  const handleChange = useCallback((newData: any) => {
    row[column.tag] = newData
    if (!columnTypeHasList) setContent(newData)

    if (column.relatedFields) {
      column.relatedFields.forEach((handlRelatedFieldChange, key) => {
        row[key] = handlRelatedFieldChange(row)
      })
      onUpdateRow()
    }

	}, [
    row, 
    column.tag, column.relatedFields, 
    setContent, 
    onUpdateRow,
    columnTypeHasList
  ])
  
  const handleSelected = () => setSelected(!selected)

  const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  return <>
    { 
      row.isEditable 
        ? getEditableCell({ 
            content, 
            selected,
            relationship,
            columnType: column.type,  
            columnFields: 
              column.type === ColumType.OBJECT 
                ? column.fields 
                : undefined,
            filter: filter,
            onChange: handleChange,
            onSelected: handleSelected,
            onChangeFilter: handleChangeFilter,
            error
          }) 
        : getCell({ 
            content,
            relationship,
            columnType: column.type, 
            columnFields: 
              column.type === ColumType.OBJECT 
                ? column.fields 
                : undefined,
          }) 
    }
  </>
}
