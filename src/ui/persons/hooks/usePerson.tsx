import { PersonDocument } from "@lib/db/schemas/person/Person";
import { useState, useEffect } from "react";

export default function usePerson(data: PersonDocument) {
  const [person, setPerson] = useState<PersonDocument>(data);
  
  useEffect(() => setPerson(data), [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    })
  }

  const handleDebtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerson({
      ...person,
      debt: {
        ...person.debt,
        [e.target.name]: parseInt(e.target.value || "0")
      }
    })
  }

  return {
    person,
    handleInputChange,
    handleDebtChange
  }
}
