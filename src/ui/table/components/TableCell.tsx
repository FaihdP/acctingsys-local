import { Column, ColumType } from "@ui/table/interfaces/Table"
import { MappedObject } from "@ui/table/interfaces/Row"
import { useCallback, useEffect, useState } from "react"
import { ContentEditableEvent } from "react-contenteditable"
import getCell from "../util/getCell"
import getEditableCell from "../util/getEditableCell"

interface CellProps { 
  row: MappedObject
  value: any
  column: Column
  className?: string
}

export default function TableCell({ 
  row,
  value,
  column,
  className,
}: CellProps) {
  const [selected, setSelected] = useState<boolean>(false)
  const [relationship, setRelationship] = useState()
  const [content, setContent] = useState(value)

  const getRelationship = useCallback(async () => {
    if (!column.relationship) return
    if (column.relationship instanceof Map) return column.relationship
    if (column.relationship instanceof Function) return await column.relationship("")
  }, [column])

  useEffect(() => { setContent(value) }, [value, row.isEditable])

  useEffect(() => {
    const fetchRelationship = async () => {
      const result = await getRelationship()
      setRelationship(result)
    }
    fetchRelationship()
  }, [getRelationship])

  const handleChange = useCallback((newData: any) => {
    row[column.tag] = newData
    if (
      column.type !== ColumType.TEXT 
      && column.type !== ColumType.NUMBER
      && column.type !== ColumType.CURRENCY
    ) {
      setContent(newData)
    }
	}, [row, column])
  
  const handleSelected = () => setSelected(!selected)

  return <>
    { 
      row.isEditable 
        ? getEditableCell({ 
            columnType: column.type,  
            columnFields: column.fields,
            content, 
            onChange: handleChange,
            relationship: relationship,
            selected,
            onSelected: handleSelected
          }) 
        : getCell({ 
            columnType: column.type, 
            columnFields: column.fields,
            content,
            relationship: relationship
          }) 
    }
  </>
}
