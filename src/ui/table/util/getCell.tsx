import formatCurrency from "@lib/util/currency"
import { ColumType } from "@ui/table/interfaces/Table"
import { RelationshipComponent as IRelationshipComponent } from "../interfaces/RelationshipComponent"

interface GetCellProps {
  columnType: ColumType
  content: any
  relationship?: any
  columnFields?: string[]
}

export default function getCell({ columnType, content, relationship, columnFields }: GetCellProps) {
  let Element

  function TableData(
    { 
      children, 
      classname,
    }: { 
      children: React.ReactNode, 
      classname?: string,
    }
  ) { 
    return <td className={classname}>{ children }</td>
  }

  switch (columnType) {
    case ColumType.TEXT: {
      Element = 
        <TableData>
          {content}
        </TableData>

      break
    }
    case ColumType.CURRENCY: {
      Element = 
        <TableData classname="text-right"> 
          <span className="me-4">{ content <= 0 ? "" : formatCurrency(content) }</span>
        </TableData>

      break
    }
    case ColumType.NUMBER: {
      Element = 
        <TableData>
          {content}
        </TableData>

      break
    }
    case ColumType.LIST: {
      let text = ""
      if (Array.isArray(content) && content.length > 0) text = content.join(", ") + "..."
      Element = 
        <TableData>
          {text}
        </TableData>

      break
    }
    case ColumType.DATE: {
      Element = 
        <TableData>
          {content}
        </TableData>

      break 
    }
    case ColumType.OBJECT: {
      let text = ""
      if (content !== null && typeof content === "object" && columnFields) {
        text = columnFields.map((columnField) => content[columnField]).join(" ")
      }
      
      Element = 
        <TableData>
          {text}
        </TableData>

      break
    }
    case ColumType.SELECT: {
      if (!relationship && !Array.isArray(relationship)) break
      
      const RelationshipComponent: IRelationshipComponent = 
        relationship.filter((tag: any) => tag.key === content)[0]?.component

      if (!RelationshipComponent) {
        return (
          <TableData>
            <div className="
              flex
              items-center
              min-h-[28px]
              w-full 
            ">
              <span className="
                rounded-lg 
                px-[6px] 
                py-[2px] 
                bg-slate-200" 
              >
                { content }
              </span>
            </div>
          </TableData>
        )
      }

      Element = 
        <TableData>
          <RelationshipComponent onClickRemove={() => {}} onClickSpan={() => {}} isEditable={false} />
        </TableData>

      break
    }
    default:
      break;
  }

  return Element
}
