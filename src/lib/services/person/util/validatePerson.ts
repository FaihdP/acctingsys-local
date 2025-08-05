import Person, { PersonDocument } from "@lib/db/schemas/person/Person"
  
export default function validatePerson(person: PersonDocument | Person) {
  if (!person.id) {
    throw new Error("Id is required")
  }

  if (!person.name) {
    throw new Error("Name is required")
  }

  if (!person.lastname) {
    throw new Error("Lastname is required")
  }

  if (!person.type) {
    throw new Error("Type is required")
  }

  if (person.isDeleted === undefined) {
    throw new Error("isDeleted is required")
  }

  
}