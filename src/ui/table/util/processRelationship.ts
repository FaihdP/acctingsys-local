import { ColumType } from "../interfaces/Table"
import { ListColumn, ObjectColumn, SelectColumn } from "../interfaces/ColumTypes"
import getDatabaseFilterObject from "@ui/core/util/getDatabaseFilterObject"

export default async function processRelationship(
  column: ListColumn | ObjectColumn | SelectColumn, 
  filter: string, 
  columnFields?: string[],
  documentId?: string
) {
  if (!column.relationship) return []
  if (column.relationship instanceof Function) {
    /**
     * // TODO: Improve this so that the filter searches loaded array first,
     * if it doesn't get information, execute the consult
     */
    if (column.type === ColumType.OBJECT && columnFields) {
      const filterObject = getDatabaseFilterObject(columnFields, filter)
      const data = (await column.relationship(filterObject)).data
      return data
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