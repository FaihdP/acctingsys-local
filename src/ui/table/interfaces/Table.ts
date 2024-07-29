import { ChangeEvent } from "react"

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
  onClick?: (e: ChangeEvent<HTMLAnchorElement>) => void
}

export interface Column {
  tag: string
  label: string
  width?: number
  minWidth?: number
  type: ColumType
  // Only for ColumType.SELECT
  relationship?: Map<string, { background: string, fontColor: string }>
}

export interface MappedObject {
  isSelected: boolean
  isEditable: boolean
  isNewRow?: boolean
  [key: string]: any
}

export interface Row {
  key: string, 
  value: MappedObject
}

export default interface TableProps {
  getData: () => Promise<any>,
  filters?: {},
  config: {
    /**
     * Modify the table data 
     */
    modifiers: {
      onAddRow?: () => Promise<any>,
      onDeleteRow?: () => Promise<any>,
    },
    /**
     * Modify the database data 
     */
    actions: {
      onAdd?: () => Promise<any>,
      onDelete?: () => Promise<any>,
      onEdit?: () => Promise<any>
    }
    header: {
      picker: boolean
      options?: {
        onEdit: boolean
        others?: Option[]
      }
      columns: Column[]
    },
  }
}