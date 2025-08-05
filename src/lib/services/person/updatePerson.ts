import MongoUpdateOptions from "@lib/db/interfaces/MongoUpdateOptions"
import update from "@lib/db/repositories/update"
import COLLECTIONS from "@lib/db/schemas/common/Collections"
import { PersonDocument } from "@lib/db/schemas/person/Person"
import handleError from "@lib/util/error/handleError"

export default async function updatePerson(personId: string, personUpdateObject: MongoUpdateOptions<PersonDocument>) {
  try {
    await update<PersonDocument>(COLLECTIONS.PERSONS, { _id: { $oid: personId } }, personUpdateObject)
  } catch (error) {
    throw handleError(error)
  }
}
