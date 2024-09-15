import { Column, ColumType } from "@ui/table/interfaces/Table"
import { MappedObject } from "@ui/table/interfaces/Row"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import getCell from "../util/getCell"
import getEditableCell from "../util/getEditableCell"
import processRelationship from "../util/processRelationship"
import ColumTypes from "../interfaces/ColumTypes"

interface CellProps { 
  row: MappedObject
  value: any
  column: ColumTypes
  className?: string
}

export default function TableCell({ 
  row,
  value,
  column,
  className,
}: CellProps) {
  const [selected, setSelected] = useState<boolean>(false)
  const [relationship, setRelationship] = useState([])
  const [content, setContent] = useState(value)
  const [filter, setFilter] = useState<string>("")

  useEffect(() => { 
    setContent(value) 
  }, [value, row.isEditable])

  useEffect(() => {
    if (
      column.type === ColumType.OBJECT 
      || column.type === ColumType.SELECT
      || column.type === ColumType.LIST
    ) {
      const getRelationship = async () => {
        return await processRelationship(column, filter, column.type === ColumType.OBJECT ? column.fields : undefined)
      }
      (async () => {
        const result = await getRelationship()
        setRelationship(result)
      })()
    }
  }, [column, filter])

  const handleChange = useCallback((newData: any) => {
    row[column.tag] = newData
    if (
      column.type !== ColumType.TEXT 
      && column.type !== ColumType.NUMBER
      && column.type !== ColumType.CURRENCY
    ) {
      setContent(newData)
    }
	}, [row, column.tag, column.type])
  
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
            onChangeFilter: handleChangeFilter
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
