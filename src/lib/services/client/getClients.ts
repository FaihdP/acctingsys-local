import find, { FindResults } from "@lib/db/repositories/find"
import COLLECTIONS from "@lib/db/schemas/common/Collections"
import { PersonDocument, PersonType } from "@lib/db/schemas/person/Person"
import FIND_DOCUMENTS_SIZE from "@ui/core/constants/FIndDocumentsSize"

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
    pageNumber ? { size: FIND_DOCUMENTS_SIZE, number: pageNumber } : undefined,
  )

  return result
}