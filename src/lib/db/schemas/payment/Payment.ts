import MongoDocument from "@schemas/common/MongoDocument"
import Person from "../embedded/Person"
import Bank from "../bank/Bank"

export enum PAYMENT_TYPE {
  CASH = "CASH",
  CREDIT = "CREDIT"
}

export default interface Payment {
  invoiceId?: string
  personId?: string
  userId: string,
  date: string
  value: number
  type: PAYMENT_TYPE,
  bankId?: string,
  bank?: Bank
  migrated: boolean
  isDeleted: boolean,
  user: Person,
  person?: Person
}

export interface PaymentDocument extends Payment, MongoDocument {}