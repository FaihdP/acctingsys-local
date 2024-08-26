import { MappedObject } from "../interfaces/Row"

export default function mapData(data: any): Map<string, MappedObject> {
  const map = new Map()
  data.forEach((row: any, index: number) => {
    row.isSelected = false
    row.isEditable = false
    row.isNewRow = false
    map.set("row_" + index, row)
  })
  return map
}
