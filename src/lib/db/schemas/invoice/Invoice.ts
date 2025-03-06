import Person from "@schemas/embedded/Person"
import Product from "@schemas/embedded/Product"
import MongoDocument from "@schemas/common/MongoDocument"
import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus"

export enum INVOICE_TYPE {
  SALE = "SALE",
  BUY = "BUY"
}

export interface Invoice {
  date: string
  value: number
  type: INVOICE_TYPE
  userId: string
  personId?: string
  isPaid?: boolean
  user: Person
  person?: Person
  productOverview?: Product[],
  migrated: boolean,
  isDeleted: boolean,
  status?: INVOICE_STATUS
}

export interface InvoiceDocument extends Invoice, MongoDocument {}