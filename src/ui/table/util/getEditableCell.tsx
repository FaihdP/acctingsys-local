import Input from "@ui/core/components/Input";
import { ColumType } from "@ui/table/interfaces/Table";
import { EventHandler, MouseEvent } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import TableSelectPopup from "../components/TableSelectPopup";

interface GetEditableCellProps {
  columnType: ColumType
  columnFields?: string[]
  content: any
  relationship?: any
  selected: boolean
  onChange: (data: any) => void
  onSelected: () => void
}

export default function getEditableCell({ 
  columnType, 
  columnFields,
  content, 
  relationship,
  selected,
  onChange, 
  onSelected
}: GetEditableCellProps) {
  let Element
  const classname = `
    flex 
    items-center
    min-h-[28px] 
    ps-1
  `  

  function TableData(
    { 
      children, 
      classname,
      onClick
    }: { 
      children: React.ReactNode, 
      classname?: string,
      onClick?: (e: MouseEvent<HTMLTableCellElement>) => void
    }
  ) { 
    return <td onClick={onClick} className={classname}>{ children }</td>
  }

  switch (columnType) {
    case ColumType.TEXT: {
      Element = 
        <TableData>
          <ContentEditable 
            html={content.toString()} 
            onChange={(e: ContentEditableEvent) => onChange(e.currentTarget.innerHTML)} 
            className={classname}
          />
        </TableData>
      break
    }
    case ColumType.CURRENCY: { 
      Element = 
        <TableData>
          <ContentEditable 
            html={content.toString()} 
            onChange={(e: ContentEditableEvent) => onChange(e.currentTarget.innerHTML)} 
            className={classname}
          />
        </TableData>
      break
    }
    case ColumType.NUMBER: {
      Element = 
        <TableData classname="text-right">
          <ContentEditable 
            html={content.toString()} 
            onChange={(e: ContentEditableEvent) => onChange(e.currentTarget.innerHTML)} 
            className={classname} 
          />
        </TableData>
      break
    }
    // TODO: Solve visual bug when the popup is showed and the page has been scrolled
    case ColumType.LIST: {
      if (!Array.isArray(content)) {
        Element = <TableData> </TableData>
        break
      }

      const handleChangeList = (item: string | number, action: 'add' | 'delete') => {
        if (action === 'add') {
          onChange([ ...content, item])
        } else if (action === 'delete') {
          if (typeof item === 'number') {
            content.splice(item, 1)
            onChange([ ...content ])
          }
        }
      }

      Element = 
        <TableData>
          <div 
            className={`
              w-full 
              h-full 
              min-h-[28px] 
              ${selected ? "z-10 relative" : ""}
            `} 
            onClick={() => onSelected()}
          >
            { 
              content.map((value, index) => 
                <span 
                  key={index} 
                  onClick={e => { if (selected) e.stopPropagation() }}
                  className="
                    inline-block 
                    rounded-lg 
                    bg-slate-200 
                    px-[6px] 
                    py-[1px] 
                    my-[1px] 
                    me-1 
                    cursor-default
                  "
                >
                  { value }
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation()
                      if (!selected) onSelected()
                      handleChangeList(index, "delete")
                    }}
                    className="
                      ms-1 
                      cursor-pointer 
                      inline 
                      text-slate-400
                    "
                  >
                    ⨉
                  </button>
                </span>
              ) 
            }
          </div>

          { 
            selected && 
              <TableSelectPopup 
                relationship={relationship} 
                columnType={columnType}
                onSelected={onSelected} 
                onChange={onChange}
                onChangeList={handleChangeList}
              />
          }

        </TableData>

      break
    }
    case ColumType.OBJECT: {
      Element = <>
        <TableData>
          <div 
            className={`
              w-full 
              h-full 
              min-h-[28px] 
              flex
              items-center
              ${selected ? "z-10 relative" : ""}
            `} 
            onClick={() => onSelected()}
          >
            { 
              (content !== null && typeof content === "object") && 
                <span 
                  className="bg-slate-200 rounded-lg px-[6px] py-[1px] me-1"
                  onClick={e => { if (selected) e.stopPropagation() }}
                >
                  { columnFields ? columnFields.map((columnField) => content[columnField]).join(" ") : "" } 
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation()
                      if (!selected) onSelected()
                    }}
                    className="
                      ms-1 
                      cursor-pointer 
                      inline 
                      text-slate-400
                    "
                  >
                    ⨉
                  </button>
                </span>
            }
          </div>
          {
            selected &&
              <div 
                className="fixed w-[100vw] h-[100vh] top-0 left-0 cursor-default z-0 overflow-hidden" 
                onClick={() => onSelected()}
              />
          }
          { 
            selected && 
              <TableSelectPopup 
                onSelected={onSelected} 
                relationship={relationship} 
                columnType={columnType}
                onChange={onChange}
                columnFields={columnFields || []}
              />
          }
              
        </TableData>
      </>

      break
    }
    case ColumType.SELECT: {
      if (!relationship || !(relationship instanceof Map)) return <td></td>
      const colors = relationship.get(content)
      Element = 
        <TableData onClick={() => onSelected()}>
          <div>
            {colors && 
              <span
                className="rounded-lg px-[6px] py-[2px]" 
                style={{ 
                  background: colors.background, 
                  color: colors.fontColor 
                }}
              >
                { content }
              </span>}  
          </div>

          {
            selected &&
              <>
                <div 
                  className="fixed w-[100vw] h-[100vh] top-0 left-0 cursor-default z-0" 
                  onClick={() => onSelected()}
                />
                  { 
                    (relationship && relationship instanceof Map) &&
                      <TableSelectPopup 
                        onSelected={onSelected} 
                        relationship={relationship} 
                        columnType={columnType}
                        onChange={onChange}
                      />
                  }
              </>
          }
        </TableData>

      break
    }
    case ColumType.DATE: {
      Element = <TableData> </TableData>
        {/* TODO: Make a editable date component */}
        {/* <div
          onClick={handleShowEditablePopup}
          onChange={onChange} 
          className="cursor-pointer"
        >
          { content } 
        </div>

        { showEditablePopup &&
            <div className="
              absolute 
              bg-white 
              w-[300px] 
              h-[200px] 
              mt-1 
              flex 
              justify-center 
              items-center 
              rounded
              shadow-[0_0_3px_0px_rgba(0,0,0,0.3)]"
            >
              Hola
            </div> } */}
      break
    }
    default: {
      Element = <td></td>
    }
  }

  return Element
}
