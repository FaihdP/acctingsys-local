import MongoDocument from "../common/MongoDocument"

export default interface PersonPhones {
  personId: string
  phone: string
}

export interface PersonPhonesDocument extends PersonPhones, MongoDocument {}
