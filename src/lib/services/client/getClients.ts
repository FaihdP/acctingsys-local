import find, { FindResults } from "@lib/db/repositories/find"
import COLLECTIONS from "@lib/db/schemas/common/Collections"
import { PersonDocument, PersonType } from "@lib/db/schemas/person/Person"

export default async function getClients(
  filters: any,
  pageNumber?: number
): Promise<FindResults<PersonDocument[]>> {
  const result = await find<PersonDocument>(
    COLLECTIONS.PERSONS, 
    {
      ...filters,
      isDeleted: false,
      type: PersonType.CLIENT
    }, 
    pageNumber ? { size: 25, number: pageNumber } : undefined,
    undefined,
  )

  return result
}