import { Dispatch, MutableRefObject, SetStateAction } from "react"
import ColumTypes from "./ColumTypes"
import { MappedObject, Row } from "./Row"

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
  onClick: (row: Row) => void
}

export interface Column {
  tag: string
  label: string
  type: ColumType
  width?: number
  minWidth?: number
  required?: boolean
  defaultValue?: any
  relatedFields?: Map<string, ((newValue: any) => any)>
}

export interface TableConfigHeaderProps {
  picker: boolean
  options?: {
    onEdit: boolean
    others?: Option[]
  }
  columns: ColumTypes[]
}

export interface TableConfigPropsBase {
  header: TableConfigHeaderProps
}

export type TableConfigProps = TableConfigPropsBase & (
  /**
   * ### Modifiers
   * It will be execute when interacting with the different funcionalities in the table (add, edit, delete). 
   */
  | { 
      actions?: never
      modifiers?: {
        onAddRow?: () => Promise<any>,
        onDeleteRow?: (id: string[]) => Promise<any>,
        onEditRow?: (data: any) => Promise<any>
      },
    }
  /**
   * ### Actions
   * It executes when interacting with the different funcionalities in the table and modify the data in db. 
   */
  | {
      modifiers?: never,
      actions?: {
        onAdd?: (data: any) => Promise<any>,
        onDelete?: (rowKey: string, data: any) => Promise<any>,
        onEdit?: (rowKey: string, data: any) => Promise<any>
      }
    }
  | {
      modifiers?: {
        onAddRow?: () => Promise<any>,
        onDeleteRow?: (id: string[]) => Promise<any>,
        onEditRow?: (data: any) => Promise<any>
      },
      actions?: {
        onAdd?: (data: any) => Promise<any>,
        onDelete?: (id: string, data: any) => Promise<any>,
        onEdit?: (id: string, data: any) => Promise<any>
      }
    }
)

export default interface TableProps {
  config: TableConfigProps
  initialData: Map<string, MappedObject> | null
  pageSelected: number
  setPageSelected: Dispatch<SetStateAction<number>>,
  pagesNumber: MutableRefObject<number>
}