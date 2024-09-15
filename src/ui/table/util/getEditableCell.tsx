import Input from "@ui/core/components/Input";
import { ColumType } from "@ui/table/interfaces/Table";
import { ChangeEvent, EventHandler, MouseEvent } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import TableSelectPopup from "../components/TableSelectPopup";

interface GetEditableCellProps {
  columnType: ColumType
  columnFields?: string[]
  content: any
  relationship?: any
  selected: boolean
  filter: string
  onChange: (data: any) => void
  onSelected: () => void
  onChangeFilter: (e: ChangeEvent<HTMLInputElement>) => void
}

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

export default function getEditableCell({ 
  columnType, 
  columnFields,
  content, 
  relationship,
  selected,
  filter,
  onChange, 
  onSelected,
  onChangeFilter
}: GetEditableCellProps) {
  let Element
  const classname = `
    flex 
    items-center
    min-h-[28px] 
    ps-1
  `  

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
                filter={filter}
                onSelected={onSelected} 
                onChange={onChange}
                onChangeList={handleChangeList}
                onChangeFilter={onChangeFilter}
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
                relationship={relationship} 
                columnType={columnType}
                columnFields={columnFields || []}
                filter={filter}
                onSelected={onSelected} 
                onChange={onChange}
                onChangeFilter={onChangeFilter}
              />
          }
              
        </TableData>
      </>

      break
    }
    case ColumType.SELECT: {
      if (!relationship || !Array.isArray(relationship)) return <td></td>
      const colors = 
        relationship.filter(
          (tag: { key: string, colors: any }) => 
            tag.key === content
        )[0]?.colors

      Element = 
        <TableData onClick={() => onSelected()} classname="xd">
          <div>
            {
              colors &&
                <span
                  className="rounded-lg px-[6px] py-[2px]" 
                  style={{ 
                    background: colors.background, 
                    color: colors.fontColor 
                  }}
                >
                  { content }
                </span>
            }
            {
              (!colors && content) &&
                <span
                  className="rounded-lg px-[6px] py-[2px] bg-slate-200" 
                >
                  { content }
                </span>
            }
          </div>

          {
            selected &&
              <>
                <div 
                  className="fixed w-[100vw] h-[100vh] top-0 left-0 cursor-default z-0" 
                  onClick={() => onSelected()}
                />
                  { 
                    (relationship && Array.isArray(relationship)) &&
                      <TableSelectPopup 
                        relationship={relationship} 
                        columnType={columnType}
                        filter={filter}
                        onSelected={onSelected} 
                        onChange={onChange}
                        onChangeFilter={onChangeFilter}
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
