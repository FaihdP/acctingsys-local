import formatCurrency from "@lib/util/currency"
import { ColumType } from "@ui/table/interfaces/Table"

interface GetCellProps {
  columnType: ColumType
  content: any
  relationship?: Map<string, { background: string, fontColor: string }>
}

export default function getCell({ columnType, content, relationship }: GetCellProps) {
  let Element
  switch (columnType) {
    case ColumType.TEXT: {
      Element = content
      break
    }
    case ColumType.CURRENCY: {
      Element = formatCurrency(content)
      break
    }
    case ColumType.NUMBER: {
      Element = content
      break
    }
    case ColumType.LIST: {
      let text = ""
      if (Array.isArray(content)) text = content.join(", ") + "..."
      Element = text
      break
    }
    case ColumType.DATE: {
      Element = content
      break
    }
    case ColumType.OBJECT: {
      let text = ""
      if (content !== null && typeof content === "object") 
        text = Object.values(content).join(" ")
      Element = text
      break
    }
    case ColumType.SELECT: {
      if (!relationship) break
      const colors = relationship.get(content)
      if (!colors) break

      Element = 
        <span
          className="rounded-lg px-[6px] py-[2px]" 
          style={{ 
            background: colors.background, 
            color: colors.fontColor 
          }}
        >
          { content }
        </span>
      break
    }
    default:
      break;
  }

  return Element
}
