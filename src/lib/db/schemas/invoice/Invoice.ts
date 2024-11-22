import Person from "@schemas/embedded/Person"
import Product from "@schemas/embedded/Product"
import MongoDocument from "@schemas/common/MongoDocument"

export enum InvoiceType {
  SALE = "SALE",
  BUY = "BUY"
}

export interface Invoice {
  date: string
  value?: number
  type: InvoiceType
  userId: string
  personId?: string
  isPaid?: boolean
  user: Person
  person?: Person
  productOverview?: Product[],
  migrated: boolean,
  isDeleted: boolean,
  status?: string
}

export interface InvoiceDocument extends Invoice, MongoDocument {}