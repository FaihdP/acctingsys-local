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
  relationship?: Map<string, { background: string, fontColor: string }> | ((filter: string) => Promise<any>)
  fields?: string[]
}

export interface TableConfigHeaderProps {
  picker: boolean
  options?: {
    onEdit: boolean
    others?: Option[]
  }
  columns: Column[]
}

export interface TableConfigProps {
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
    onAdd: (data: any) => Promise<any>,
    onDelete?: (id: string) => Promise<any>,
    onEdit?: (id: string, data: any) => Promise<any>
  }
  header: TableConfigHeaderProps,
}

export default interface TableProps {
  getData: (...args: any[]) => Promise<any>,
  filters?: any,
  config: TableConfigProps
}