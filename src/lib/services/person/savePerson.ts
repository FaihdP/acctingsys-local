import handleError from "@lib/util/error/handleError"
import save from "@lib/db/repositories/save"
import COLLECTIONS from "@lib/db/schemas/common/Collections"
import validatePerson from "./util/validatePerson"
import Person from "@lib/db/schemas/person/Person"

export default async function savePerson(person: Person) {
  try {
    validatePerson(person)
    const response = await save(COLLECTIONS.PERSONS, [person])
    return response
  } catch (error) {
    throw handleError(error)
  }
}