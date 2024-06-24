import Person from "@schemas/embedded/Person"
import MongoDocument from "@schemas/common/MongoDocument"

export interface Product {
  name: string
  value?: string
  description?: string
  type?: string
  userId: string
  user: Person
}

export interface ProductDocument extends Product, MongoDocument {}