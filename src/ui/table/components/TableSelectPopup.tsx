import Backdrop from "@ui/core/components/Backdrop";
import { ColumType } from "../interfaces/Table";
import Spin from "@ui/core/components/Spin";
import { ChangeEvent } from "react";
import Popover from "@ui/core/components/Popover";

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
  const options = relationship

  return (
    <Popover 
      filter={filter}
      columnType={columnType}
      columnFields={columnFields || []}
      options={options}
      onChangeVisiblePopover={onSelected}
      onChange={onChange}
      onChangeList={onChangeList}
      onChangeFilter={onChangeFilter}
    />
  );
}
