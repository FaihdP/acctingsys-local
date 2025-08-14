import update from "@lib/db/repositories/update"
import COLLECTIONS from "@lib/db/schemas/common/Collections"
import { PersonDocument } from "@lib/db/schemas/person/Person"
import handleError from "@lib/util/error/handleError"

export default async function deleteByUpdatePerson(personIds: string[]) {
  try {
    for (const personId of personIds) {
      await update<PersonDocument>(
        COLLECTIONS.PERSONS, 
        { _id: { $oid: personId } },
        { $set: { isDeleted: true } }
      )
    }
  } catch (err) {
    handleError(err)
  }
}