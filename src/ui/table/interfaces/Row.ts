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