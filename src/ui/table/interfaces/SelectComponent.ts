import { ComponentType, MouseEvent } from "react"

export type SelectComponent = ComponentType<SelectComponentProps>

export type SelectComponentProps =  {
  onClickSpan: (e: MouseEvent<HTMLSpanElement>) => void, 
  onClickRemove: (e: MouseEvent<HTMLSpanElement>) => void,
  isEditable: boolean,
}