import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus"
import { ComponentType, MouseEvent } from "react"

export type RelationshipComponent = ComponentType<RelationshipComponentProps>

export type RelationshipComponentProps =  {
  onClickSpan: (e: MouseEvent<HTMLSpanElement>) => void, 
  onClickRemove: (e: MouseEvent<HTMLSpanElement>) => void,
  isEditable: boolean,
}