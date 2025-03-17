import MongoDocument from "@schemas/common/MongoDocument"
import Person from "../embedded/Person"

export enum PAYMENT_TYPE {
  CASH = "CASH",
  CREDIT = "CREDIT"
}

export enum Bank {
  // TODO: Make alternative for the bank storage
}

export default interface Payment {
  invoiceId?: string
  personId?: string
  userId: string,
  date: string
  value: number
  type: PAYMENT_TYPE
  bank?: Bank
  migrated: boolean
  isDeleted: boolean,
  user: Person,
  person?: Person
}

export interface PaymentDocument extends Payment, MongoDocument {}