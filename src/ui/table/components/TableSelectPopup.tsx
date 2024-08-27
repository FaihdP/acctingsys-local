import Input from "@ui/core/components/Input";
import { ColumType } from "../interfaces/Table";
import Spin from "@ui/core/components/Spin";

interface TableSelectPopupProps {
  onSelected: () => void
  onChange: (data: any) => void
  onChangeList?: (item: string | number, action: 'add' | 'delete') => void
  relationship: Map<string, any> | any[]
  columnType: ColumType
  columnFields?: string[]
}

export default function TableSelectPopup({ 
  onSelected, 
  onChange,
  onChangeList,
  relationship,
  columnType,
  columnFields
}: TableSelectPopupProps) {
  const isColumnTypeList = columnType === ColumType.LIST;

  const getOptions = () => {
    switch (columnType) {
      case ColumType.SELECT: {
        return Array.from(relationship, ([key, value]) => { return { key, colors: value } }) 
      }
      default: {
        return relationship
      }
    }
  }

  const options = getOptions()

  const renderOptionContent = (value: any) => {
    if (columnType === ColumType.OBJECT && columnFields) {
      return columnFields.map((field) => value[field]).join(" ");
    }
    if (columnType === ColumType.SELECT) {
      return value.key
    }
    
    return value;
  };

  const renderOptions = () => {
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

      const Content = ({ styles, onClick }: { styles?: any, onClick?: any }) => {
        return (
          <span
            key={index}
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
            {renderOptionContent(value)}
          </span>
        )
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
            />
          </div>
        )
      } else {
        return <Content key={index} onClick={handleChange} />
      }
    });
  };

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
          <Input 
            name="search_client" 
            type="text" 
            value=""
            placeholder="Busca una opción..."
            onChange={() => {}} 
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
          {renderOptions()}
        </div>
      </div> 
    </>
  );
}
