import find from "@lib/db/repositories/find";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { PersonPhonesDocument } from "@lib/db/schemas/personPhones/PersonPhones";
import handleError from "@lib/util/error/handleError";

export default async function getPersonPhones(personId: string) {
  try {
    const response = await find<PersonPhonesDocument>(COLLECTIONS.PERSON_PHONES, { personId: personId })
    return response
  } catch (error) {
    throw handleError(error)
  }
}
