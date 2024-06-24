import Phone from "@schemas/embedded/Phone"
import Debt from "@schemas/embedded/Debt"
import MongoDocument from "@schemas/common/MongoDocument"

export enum PersonType {
  SELLER,
  BUYER
}

export default interface Person {
  id?: string
  name: string
  lastname: string
  type: PersonType,
  phone?: Phone[]
  debt?: Debt
}

export interface PersonDocument extends Person, MongoDocument {}