import { ComponentType, MouseEvent } from "react"

export type ObjectComponentColors = {
  background: string,
  font: string
}

export type ObjectComponent = ComponentType<ObjectComponentProps>

export type ObjectComponentProps =  {
  onClickSpan: (e: MouseEvent<HTMLSpanElement>) => void, 
  onClickRemove: (e: MouseEvent<HTMLSpanElement>) => void,
  isEditable: boolean,
  colors: ObjectComponentColors
}