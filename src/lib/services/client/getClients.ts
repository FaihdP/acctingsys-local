import find, { FindResults } from "@lib/db/repositories/find"
import COLLECTIONS from "@lib/db/schemas/common/Collections"
import { PersonDocument, PersonType } from "@lib/db/schemas/person/Person"

export default async function getClients(
  filters: any
): Promise<FindResults<PersonDocument[]>> {
  //await new Promise(r => setTimeout(r, 10000))
  const result = await find<PersonDocument>(
    COLLECTIONS.PERSONS, 
    {
      ...filters,
      isDeleted: false,
      type: PersonType.CLIENT
    }, 
    undefined,
    undefined,
    { name: 1, lastname: 1 }
  )

  return result.data ? result : { data: [], pages_number: 0, total_records: 0 }
}