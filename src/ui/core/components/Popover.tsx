import { ColumType } from "@ui/table/interfaces/Table";
import Spin from "./Spin";
import Backdrop from "./Backdrop";
import { ChangeEvent } from "react";

const renderOptionContent = (value: any, columnFields: any[] = [], columnType: ColumType) => {
  if (columnType === ColumType.OBJECT && columnFields) {
    return columnFields.map((field) => value[field]).join(" ");
  }
  if (columnType === ColumType.SELECT) {
    return value.key
  }
  
  return value
}

const Content = ({ 
  styles, 
  onClick, 
  content, 
  isColumnTypeList 
}: { 
  styles?: any, 
  onClick?: any,
  content: any,
  isColumnTypeList: boolean 
}) => {
  return (
    <span
      onClick={onClick ? onClick : null}
      className={`
        bg-slate-200 
        rounded-lg 
        px-[6px] 
        py-[1px] 
        inline-block 
        cursor-pointer
        ${isColumnTypeList ? "mt-[5px] me-[2px]" : "ms-1"}
      `}
      style={styles}
    >
      { content }
    </span>
  )
}

export const renderOptions = (
  options: Map<string, any> | any[], 
  columnType: ColumType, 
  columnFields: string[], 
  isColumnTypeList: boolean, 
  onChange: (data: any) => void,
  onChangeList?: (item: string | number, action: 'add' | 'delete') => void
) => {
  if (!options || !Array.isArray(options)) {
    return (
      <span className="flex justify-center items-center my-1">
        <Spin size={14} className="me-3" />
      </span>
    );
  }

  if (options.length === 0) {
    return (
      <div className="text-center mt-1">
        <span className="text-[#c0c5cc] text-[11px]">
          No hay opciones disponibles
        </span>
      </div>
    )
  }

  return options.map((value, index) => {
    const handleChange = () => {
      if (columnType === ColumType.SELECT) return onChange(value.key) 
      if (isColumnTypeList && onChangeList) return onChangeList(value, "add")
      return onChange(value)
    }

    if (!isColumnTypeList) {
      return (
        <div 
          key={index} 
          className="hover:bg-[rgba(0,0,0,0.05)] flex items-center h-[26px] ps-1 cursor-pointer"
          onClick={() => handleChange()}
        >
          <Content 
            // styles={
            //   columnType === ColumType.SELECT 
            //     ? { background: value.colors.background, color: value.colors.fontColor }
            //     : { background: '', color: '' }
            // }
            content={renderOptionContent(value, columnFields, columnType)}
            isColumnTypeList={isColumnTypeList}
          />
        </div>
      )
    } else {
      return ( 
        <Content 
          key={index} 
          onClick={handleChange} 
          content={renderOptionContent(value, columnFields, columnType)} 
          isColumnTypeList={isColumnTypeList}
        />
      )
    }
  })
}

interface PopoverProps {
  filter?: string | null,
  columnType: ColumType,
  columnFields?: string[],
  options: Map<string, any> | any[],
  onChangeVisiblePopover: () => void,
  onChange: (data: any) => void
  onChangeList?: (item: string | number, action: 'add' | 'delete') => void
  onChangeFilter?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function Popover({
  filter,
  columnType,
  columnFields,
  options,
  onChangeVisiblePopover,
  onChangeFilter,
  onChange,
  onChangeList,
}: PopoverProps) {
  const isColumnTypeList = columnType === ColumType.LIST
  return (
    <>
      <Backdrop onClick={onChangeVisiblePopover} />
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `
            0 1px 2px rgba(0, 0, 0, 0.12), 
            0 2px 4px rgba(0, 0, 0, 0.12), 
            0 4px 6px rgba(0, 0, 0, 0.12), 
            0 8px 16px rgba(0, 0, 0, 0.12)
          `
        }}
        className="absolute w-50 bg-white rounded-lg mt-[2px] z-10"
      >
        {
          filter !== undefined &&
            <div className="border-b px-[5px] py-[5px] border-gray-100">
              <input 
                value={filter || ""}
                onChange={onChangeFilter}
                type="text" 
                autoComplete="off"
                name="search_client" 
                placeholder="Busca una opción..."
                className="w-full h-[15px] text-[12px] ps-2 border-none border-0"
              />
            </div>
        }
        <div 
          className={`
            max-h-[250px] 
            max-w-[300px] 
            overflow-auto 
            ${isColumnTypeList ? "px-[5px]" : "w-[200px]"} 
            pt-1 
            pb-1
          `}
        >
          {renderOptions(options, columnType, columnFields || [], isColumnTypeList, onChange, onChangeList)}
        </div>
      </div> 
    </>
  )
}