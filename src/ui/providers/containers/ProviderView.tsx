import { PersonType } from "@lib/db/schemas/person/Person";
import Persons from "@ui/persons/containers/Persons";

export default function ProviderView() {
  return <Persons personType={PersonType.PROVIDER} />
}
