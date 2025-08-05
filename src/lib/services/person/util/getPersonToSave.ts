import Person from "@lib/db/schemas/person/Person";
import PersonDocument from "@lib/db/schemas/person/Person";

export default function getPersonToSave(person: PersonDocument): Person {
  return {
    id: person.id,
    name: person.name,
    lastname: person.lastname,
    type: person.type,
    debt: person.debt,
    isDeleted: false,
    phone: person.phone,
  }
} 