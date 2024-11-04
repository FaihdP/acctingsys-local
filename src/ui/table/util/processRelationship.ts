import { ColumType } from "../interfaces/Table"
import { ListColumn, ObjectColumn, SelectColumn } from "../interfaces/ColumTypes"

export default async function processRelationship(
  column: ListColumn | ObjectColumn | SelectColumn, 
  filter: string, 
  columnFileds?: string[],
  documentId?: string
) {
  if (!column.relationship) return []
  if (column.relationship instanceof Function) {
    /**
     * // TODO: Improve this so that the filter searches loaded array first,
     * if it doesn't get information, execute the consult
     */
    if (column.type === ColumType.OBJECT && columnFileds) {
      const filterObject: { 
        $or: Record<string, any>[] 
      } = {
        $or: []
      }
  
      columnFileds.forEach((columnField) => {
        const field: Record<string, any> = {}
        field[columnField] = { $regex: filter, $options: 'i' }
        filterObject.$or.push(field)
      })

      return (await column.relationship(filterObject)).data
    } else {
      return (await column.relationship(documentId))
    }
  }

  if (column.relationship instanceof Map) {
    const array = Array.from(
      column.relationship, 
      ([key, value]) => { 
        return { key, colors: value } 
      }
    )
      
    return array 
  }
}