import MongoDocument from "@schemas/common/MongoDocument"

export enum PaymentType {
  CASH,
  CREDIT
}

export enum Bank {
  // TODO: Make alternative for the bank storage
}

export default interface Payment {
  invoiceId?: string
  personId?: string
  date: string
  value: number
  type: PaymentType
  bank?: Bank
  migrated: boolean
}

export interface PaymentDocument extends Payment, MongoDocument {}