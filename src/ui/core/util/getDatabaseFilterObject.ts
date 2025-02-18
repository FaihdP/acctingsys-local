import normalizeString from "@lib/util/normalizeString"

export default function getDatabaseFilterObject(columnFields: string[], filter: string) {
  const filterObject: { $or: Record<string, any>[] } = { $or: [] }
  columnFields.forEach((columnField) => {
    const field: Record<string, any> = {}
    field[columnField] = { $regex: normalizeString(filter), $options: 'i' }
    filterObject.$or.push(field)
  })

  return filterObject
}