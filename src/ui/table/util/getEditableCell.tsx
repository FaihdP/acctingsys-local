import { ColumType } from "@ui/table/interfaces/Table";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface GetEditableCellProps {
  columnType: ColumType
  content: any
  onChange: (e: ContentEditableEvent) => void
  relationship?: Map<string, { background: string }>
  showEditablePopup: boolean
  handleShowEditablePopup: () => void
}

export default function getEditableCell({ 
  columnType, 
  content, 
  onChange, 
  relationship,
  showEditablePopup,
  handleShowEditablePopup
}: GetEditableCellProps) {
  let Element
  const classname = `
    flex 
    items-center
    w-full 
    min-h-[28px] 
    ps-1
  `  

  switch (columnType) {
    case ColumType.TEXT: {
      Element = 
        <ContentEditable 
          html={content.toString()} 
          onChange={onChange} 
          className={classname}
        />
      break
    }
    case ColumType.CURRENCY: { 
      Element = 
        <ContentEditable 
          html={content.toString()} 
          onChange={onChange} 
          className={classname}
        />
      break
    }
    case ColumType.NUMBER: {
      Element = <ContentEditable html={content.toString()} onChange={onChange} />
      break
    }
    case ColumType.LIST: {
      break
    }
    case ColumType.OBJECT: {
      break
    }
    case ColumType.SELECT: {
      break
    }
    case ColumType.DATE: {
      Element = 
        <>
          <div
            onClick={handleShowEditablePopup}
            onChange={onChange} 
            className="cursor-pointer"
          >
            { content }
          </div>

          { showEditablePopup &&
              <span>Hola</span> }
        </>
      break
    }
    default:
      Element = null
  }

  return Element
}
