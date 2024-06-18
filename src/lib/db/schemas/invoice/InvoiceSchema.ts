import Person from "@schemas/embedded/Person"
import Product from "@schemas/embedded/Product"

export enum InvoiceType {
  SALE,
  BUY
}

export interface Invoice {
  date: string
  amount: number
  type: InvoiceType
  userId?: string
  personId?: string
  isPaid?: boolean
  user: Person
  person?: Person
  productOverview?: Product[],
}