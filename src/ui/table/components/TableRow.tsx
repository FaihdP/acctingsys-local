import Image from "next/image"
import TableCell from "./TableCell"
import tableEditIcon from "@public/dashboard/table_edit.svg"
import tableAcceptIcon from "@public/dashboard/table_accept.svg"
import tableCancelIcon from "@public/dashboard/table_cancel.svg"
import TableProps, { TableConfigHeaderProps } from "../interfaces/Table"
import { Row } from "../interfaces/Row"
import validateRow from "../util/validateRow"
import { useState } from "react"

interface TableRowProps {
  header: TableConfigHeaderProps, 
  row: Row,
  actions: TableProps["config"]["actions"],
  onEditRow: (rowIndex: string) => void,
  onCancelEditRow: (rowIndex: string, newRow?: boolean) => void
  onSelectRow: (rowIndex: string) => void
}

export default function TableRow({ 
  header, 
  row,  
  actions,
  onSelectRow,
  onCancelEditRow,
  onEditRow
}: TableRowProps) {
  const sizeIconOptionsTable = 18
  const [errors, setErrors] = useState<Map<string, string>>(new Map())

  const handleSave = async (row: Row) => {  
    const errors = validateRow(row, header.columns)
    setErrors(errors)
    if (errors.size > 0) return
    if (row.value.isNewRow) {
      // TODO: Add this action result in a notification
      await actions.onAdd([row.value]) 
      row.value.isNewRow = false
    } else {
      if (actions.onEdit) { 
        await actions.onEdit(row.value["_id"], row.value)
      }
    }
    onEditRow(row.key)
  }

  return (
    <tr 
      key={row.key}  
      className="
        bg-white 
        text-[#5C5C5C]
        border-gray-100
        border-b
        min-h-[30px] 
        shadow-[0_1px_3px_-1px_rgba(0,0,0,0.1)]
      "
    > 
      { 
        (header.picker && !row.value.isNewRow) 
          ? <td className="text-center">
              <label className="table-picker">
                <input 
                  type="checkbox"
                  onChange={() => onSelectRow(row.key)} 
                  checked={row.value.isSelected}
                />
                <span className="shadow-[0_0_3px_0px_rgba(0,0,0,5)]"></span>
              </label>
            </td> 
          : <td></td>
      }
      { 
        header.columns.map(
          (column, indexColumn: number) => {
            return (
              <TableCell 
                key={row.key + "_column_" + indexColumn}
                row={row.value}
                value={(row.value.isNewRow ? column.defaultValue : row.value[column.tag]) || ""}
                errorMessage={errors ? errors.get(column.tag) : undefined}
                column={column}
                className={`
                  flex 
                  flex-col 
                  justify-center
                  ps-1
                `}
              />
            )
          }
        )
      }
      { 
        (header.options) &&
          <td
            className="
              h-[30px] 
              flex 
              justify-center 
              items-center
            " 
          >
            {
              ((header.options.onEdit && actions.onEdit) && row.value.isEditable) &&
                <>
                  <a 
                    href="#" 
                    onClick={() => handleSave(row)}
                    className="inline-block"
                  >
                    <Image
                      src={tableAcceptIcon.src}
                      alt="table_accept_icon"
                      width={sizeIconOptionsTable}
                      height={sizeIconOptionsTable}
                    />
                  </a>
                  <a 
                    href="#" 
                    onClick={() => onCancelEditRow(row.key, row.value.isNewRow)}
                    className="inline-block ms-[5px]"
                  >
                    <Image
                      src={tableCancelIcon.src}
                      alt="table_cancel_icon"
                      width={sizeIconOptionsTable}
                      height={sizeIconOptionsTable}
                    />
                  </a>
                </>
            }
            {
              ((header.options.onEdit && actions.onEdit) && !row.value.isEditable) &&
                <a 
                  href="#" 
                  onClick={() => onEditRow(row.key)}
                  className="inline-block"
                >
                  <Image
                    src={tableEditIcon.src}
                    alt="table_edit_icon"
                    width={sizeIconOptionsTable}  
                    height={sizeIconOptionsTable}
                  />
                </a>
            }
          </td>
      }
    </tr>
  )
}

