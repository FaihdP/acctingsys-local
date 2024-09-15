import Input from "@ui/core/components/Input";
import { ColumType } from "../interfaces/Table";
import Spin from "@ui/core/components/Spin";
import { ChangeEvent } from "react";

interface TableSelectPopupProps {
  relationship: Map<string, any> | any[]
  columnType: ColumType
  columnFields?: string[]
  filter: string
  onSelected: () => void
  onChange: (data: any) => void
  onChangeList?: (item: string | number, action: 'add' | 'delete') => void
  onChangeFilter: (e: ChangeEvent<HTMLInputElement>) => void
}

const renderOptionContent = (value: any, columnFields: any[], columnType: ColumType) => {
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
      onClick={onClick ? onClick : () => {}}
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

const renderOptions = (
  options: Map<string, any> | any[], 
  columnType: ColumType, 
  columnFields: string[], 
  isColumnTypeList: boolean, 
  onChange: (data: any) => void,
  onChangeList?: (item: string | number, action: 'add' | 'delete') => void
) => {
  if (!options || !Array.isArray(options)) {
    return (
      <span className="flex justify-center items-center">
        <Spin size={14} className="!me-2" /> Cargando ...
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
            styles={
              columnType === ColumType.SELECT 
                ? { background: value.colors.background, color: value.colors.color }
                : { background: '', color: '' }
            }
            content={renderOptionContent(value, columnFields || [], columnType)}
            isColumnTypeList={isColumnTypeList}
          />
        </div>
      )
    } else {
      return ( 
        <Content 
          key={index} 
          onClick={handleChange} 
          content={renderOptionContent(value, columnFields || [], columnType)} 
          isColumnTypeList={isColumnTypeList}
        />
      )
    }
  });
};

export default function TableSelectPopup({ 
  onSelected, 
  onChange,
  onChangeList,
  onChangeFilter,
  filter,
  relationship,
  columnType,
  columnFields
}: TableSelectPopupProps) {
  const isColumnTypeList = columnType === ColumType.LIST;
  const options = relationship

  return (
    <>
      <div 
        className="fixed w-[100vw] h-[100vh] top-0 left-0 cursor-default z-0" 
        onClick={onSelected}
      />
      <div 
        style={{
          boxShadow: `
            0 1px 2px rgba(0, 0, 0, 0.12), 
            0 2px 4px rgba(0, 0, 0, 0.12), 
            0 4px 6px rgba(0, 0, 0, 0.12), 
            0 8px 16px rgba(0, 0, 0, 0.12)
          `
        }}
        className="fixed w-50 bg-white rounded-lg mt-[2px] z-10"
      >
        <div className="border-b px-[5px] pt-[5px] border-gray-100">
          {/* TODO: Solve bug with select popup, when the user does click in the input, the popup is closed */}
          <input 
            value={filter}
            onChange={onChangeFilter}
            type="text" 
            autoComplete="false"
            name="search_client" 
            placeholder="Busca una opción..."
            className="w-full !h-[15px] !text-[12px] !ps-2 border-none border-0"
          />
        </div>
        <div 
          className={`
            max-h-[250px] 
            max-w-[300px] 
            overflow-auto 
            ${isColumnTypeList ? "px-[5px]" : ""} 
            pt-1 
            pb-1
          `}
        >
          {renderOptions(options, columnType, columnFields || [], isColumnTypeList, onChange, onChangeList)}
        </div>
      </div> 
    </>
  );
}
