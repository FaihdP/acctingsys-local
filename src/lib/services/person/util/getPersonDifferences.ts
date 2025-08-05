import MongoUpdateOptions from "@lib/db/interfaces/MongoUpdateOptions"
import { PersonDocument } from "@lib/db/schemas/person/Person"

export default function getPersonDifferences(newPerson: PersonDocument, oldPerson: PersonDocument) {
  const result: MongoUpdateOptions<PersonDocument> = {}
  result.$set = {}

  if (newPerson.id !== oldPerson.id) {
    result.$set.id = newPerson.id
  }

  if (newPerson.name !== oldPerson.name) {
    result.$set.name = newPerson.name
  }

  if (newPerson.lastname !== oldPerson.lastname) {
    result.$set.lastname = newPerson.lastname
  }

  if (newPerson.phone !== oldPerson.phone) {
    result.$set.phone = newPerson.phone
  }

  if (
    newPerson.debt && (
      newPerson.debt.maxValue !== oldPerson.debt?.maxValue
      || newPerson.debt.time !== oldPerson.debt?.time
    )
  ) {
    result.$set.debt = newPerson.debt
  }

  if (oldPerson.debt && !newPerson.debt) {
    result.$unset = {}
    result.$unset.debt = ""
  }
    
  return result
}

