import { Column, ColumType, MappedObject } from "@ui/table/interfaces/Table"
import { useCallback, useState } from "react"
import { ContentEditableEvent } from "react-contenteditable"
import getCell from "../util/getCell"
import getEditableCell from "../util/getEditableCell"

interface CellProps { 
  rowValue: MappedObject
  column: Column
  className?: string
}

export default function Cell({ 
  rowValue,
  column,
  className,
}: CellProps) {
  const [showEditablePopup, setShowEditablePopup] = useState<boolean>(false)
  const content = rowValue[column.tag] || ""

  const handleChange = useCallback((e: ContentEditableEvent)=> {
    rowValue[column.tag] = e.currentTarget.innerHTML
	}, [rowValue, column.tag])
  
  const handleShowEditablePopup = () => {
    setShowEditablePopup(!showEditablePopup)
  }

  return <>
    { 
      rowValue.isEditable 
        ? <td>
          { 
            getEditableCell({ 
              columnType: column.type, 
              content, 
              onChange: handleChange,
              relationship: column.relationship,
              showEditablePopup,
              handleShowEditablePopup
            }) 
          }
        </td>  
        : <td className="ps-1">
          { 
            getCell({ 
              columnType: column.type, 
              content,
              relationship: column.relationship
            }) 
          }
        </td>
    }
  </>
}
