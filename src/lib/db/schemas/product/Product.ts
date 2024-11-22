import Person from "@schemas/embedded/Person"
import MongoDocument from "@schemas/common/MongoDocument"

export interface Product {
  name: string
  value?: number
  amount?: number
  description?: string
  type?: string
  userId: string
  user: Person
  isDeleted: boolean
}

export interface ProductDocument extends Product, MongoDocument {}