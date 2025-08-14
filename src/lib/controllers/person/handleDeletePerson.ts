import deleteByUpdatePerson from "@lib/services/person/deleteByUpdatePerson";
import handleError from "@lib/util/error/handleError";

export default async function handleDeletePerson(personIds: string[]) {
  try {
    await deleteByUpdatePerson(personIds)
  } catch (error) {
    throw handleError(error)
  }
}