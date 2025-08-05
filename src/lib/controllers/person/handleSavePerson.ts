import handleError from "@lib/util/error/handleError"
import savePerson from "@lib/services/person/savePerson"
import { PersonDocument } from "@lib/db/schemas/person/Person"
import getPersonToSave from "@lib/services/person/util/getPersonToSave"

export default async function handleSavePerson(person: PersonDocument, phones: unknown) {
  console.log(phones)
  try {
    return await savePerson(getPersonToSave(person))
  } catch (error) {
    throw handleError(error)
  }
}