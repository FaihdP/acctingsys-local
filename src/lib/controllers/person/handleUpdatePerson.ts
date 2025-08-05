import { PersonDocument, PersonType } from "@lib/db/schemas/person/Person"
import getClients from "@lib/services/client/getClients"
import updatePerson from "@lib/services/person/updatePerson"
import getPersonDifferences from "@lib/services/person/util/getPersonDifferences"
import getProviders from "@lib/services/providers/getProviders"
import handleError from "@lib/util/error/handleError"

export default async function handleUpdatePerson(person: PersonDocument) {
  try {
    const getPerson = person.type == PersonType.PROVIDER ? getProviders : getClients
    const oldPerson = (await getPerson({ _id: { $oid: person._id.$oid } })).data[0]
    console.log(oldPerson)
    if (oldPerson) {
      const personDifferences = getPersonDifferences(person, oldPerson)
      console.log(personDifferences)
      await updatePerson(oldPerson._id.$oid, personDifferences)
    }
  } catch (error) {
    throw handleError(error)
  }
}