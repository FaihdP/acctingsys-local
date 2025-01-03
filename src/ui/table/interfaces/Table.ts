import { ChangeEvent, Dispatch, MutableRefObject, SetStateAction } from "react"
import ColumTypes from "./ColumTypes"
import { MappedObject } from "./Row"

export enum ColumType {
  TEXT,
  NUMBER,
  CURRENCY,
  DATE,
  SELECT,
  OBJECT,
  LIST
}

export interface Option {
  icon: any
  alt: string
  onClick: (id: string) => void
}

export interface Column {
  tag: string
  label: string
  width?: number
  minWidth?: number
  type: ColumType
  required?: boolean
  defaultValue?: any
}

export interface TableConfigHeaderProps {
  picker: boolean
  options?: {
    onEdit: boolean
    others?: Option[]
  }
  columns: ColumTypes[]
}

export interface TableConfigProps {
  /**
   * #### Modify the table data 
   */
  modifiers: {
    onAddRow?: () => Promise<any>,
    onDeleteRow?: () => Promise<any>,
  },
  /**
   * #### Modify the database data 
   */
  actions: {
    onAdd: (data: any) => Promise<any>,
    onDelete?: (id: string) => Promise<any>,
    onEdit?: (id: string, data: any) => Promise<any>
  }
  header: TableConfigHeaderProps,
}

export default interface TableProps {
  config: TableConfigProps
  initialData: Map<string, MappedObject> | null
  //setData: Dispatch<SetStateAction<Map<string, MappedObject> | null>>
  pageSelected: number
  setPageSelected: Dispatch<SetStateAction<number>>,
  pagesNumber: MutableRefObject<number>
}