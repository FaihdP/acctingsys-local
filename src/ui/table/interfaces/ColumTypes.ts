import { ComponentType } from "react"
import { Column, ColumType } from "./Table"
import { RelationshipComponentProps } from "./RelationshipComponent"

export interface DateColumn extends Column {
  type: ColumType.DATE
  autocomplete: boolean
}

export interface ListColumn extends Column {
  type: ColumType.LIST
  relationship: (filter: any) => Promise<any>
}

export interface SelectColumn extends Column {
  type: ColumType.SELECT
  relationship: Map<string, ComponentType<RelationshipComponentProps>>
}

export interface ObjectColumn extends Column {
  type: ColumType.OBJECT
  relationship: ((filter: any) => Promise<any>)
  fields: string[]
}

export interface TextColumn extends Column { type: ColumType.TEXT }
export interface CurrencyColumn extends Column { type: ColumType.CURRENCY }
export interface NumberColumn extends Column { type: ColumType.NUMBER }

type ColumTypes = 
  ObjectColumn 
  | ListColumn 
  | DateColumn 
  | TextColumn
  | CurrencyColumn
  | NumberColumn
  | SelectColumn

export default ColumTypes