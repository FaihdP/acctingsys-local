import { ColumType } from "@ui/table/interfaces/Table";
import { ChangeEvent, MouseEvent } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import TableSelectPopup from "../components/TableSelectPopup";
import { formatDate, formatToDatetimeLocal, getDateTime } from "@lib/util/time";

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
  error?: string
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
  onChangeFilter,
  error
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
          { 
            error &&
              <div className="absolute mt-[2px] bg-[#f87171] rounded-b text-[9px] text-white px-4 py-[0.5px]">
                { error }
              </div> 
          }
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
          { 
            error &&
              <div className="absolute mt-[2px] bg-[#f87171] rounded-b text-[9px] text-white px-4 py-[0.5px]">
                { error }
              </div> 
          }
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
          { 
            error &&
              <div className="absolute mt-[2px] bg-[#f87171] rounded-b text-[9px] text-white px-4 py-[0.5px]">
                { error }
              </div> 
          }
        </TableData>
      break
    }
    // TODO: Solve visual bug when the popup is showed and the page has been scrolled
    case ColumType.LIST: {
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
            { Array.isArray(content) &&
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
          { 
            error &&
              <div className="absolute mt-[2px] bg-[#f87171] rounded-b text-[9px] text-white px-4 py-[0.5px]">
                { error }
              </div> 
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
                      onChange(null)
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
          { 
            error &&
              <div className="absolute mt-[2px] bg-[#f87171] rounded-b text-[9px] text-white px-4 py-[0.5px]">
                { error }
              </div> 
          }
        </TableData>
      </>

      break
    }
    case ColumType.SELECT: {
      if (!relationship || !Array.isArray(relationship)) return <td></td>
      const colors: { background: string, fontColor: string } = 
        relationship.filter(
          (tag: { key: string, colors: any }) => tag.key === content
        )[0]?.colors

      Element = 
        <TableData>
          <div
            className={`
              w-full 
              h-full 
              min-h-[28px] 
              flex
              items-center
              relative
              ${selected ? "z-10" : ""}
            `} 
            onClick={() => onSelected()}
          >
            {
              colors &&
                <span
                  className={`
                    rounded-lg 
                    px-[6px] 
                    py-[2px]
                  `}
                  style={{ 
                    background: colors.background, 
                    color: colors.fontColor 
                  }}
                >
                  { content }
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation()
                      if (!selected) onSelected()
                      onChange(null)
                    }}
                    className="
                      ms-1 
                      cursor-pointer 
                      inline 
                      text-inherit
                    "
                  >
                    ⨉
                  </button>
                </span>
            }
          </div>

          {
            selected && (relationship && Array.isArray(relationship)) &&
              <TableSelectPopup 
                relationship={relationship} 
                columnType={columnType}
                filter={filter}
                onSelected={onSelected} 
                onChange={onChange}
                onChangeFilter={onChangeFilter}
              />
          }
          { 
            error &&
              <div className="absolute mt-[2px] bg-[#f87171] rounded-b text-[9px] text-white px-4 py-[0.5px]">
                { error }
              </div> 
          }
        </TableData>
      break
    }
    case ColumType.DATE: {
      Element =
        <TableData>
          <input 
            type="datetime-local" 
            defaultValue={formatToDatetimeLocal(content)}
            onChange={(e) => onChange(formatDate(getDateTime(e.target.value)))}
          />
          { 
            error &&
              <div className="absolute mt-[6px] bg-[#f87171] rounded-b text-[9px] text-white px-4 py-[0.5px]">
                { error }
              </div> 
          }
        </TableData>
      break
    }
    default: {
      Element = <td></td>
    }
  }

  return Element
}
