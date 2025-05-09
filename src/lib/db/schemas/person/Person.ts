import Phone from "@schemas/embedded/Phone"
import Debt from "@schemas/embedded/Debt"
import MongoDocument from "@schemas/common/MongoDocument"

export enum PersonType {
  PROVIDER = "provider",
  CLIENT = "client"
}

export default interface Person {
  id?: string
  name: string
  lastname: string
  type: PersonType,
  phone?: Phone[]
  debt?: Debt
  isDeleted: boolean
}

export interface PersonDocument extends Person, MongoDocument {}