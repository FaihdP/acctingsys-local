import Person from "@schemas/embedded/Person"
import MongoDocument from "@schemas/common/MongoDocument"

export interface Product {
  name: string
  value?: number
  quantity?: number
  userId: string
  user: Person
  isDeleted: boolean
  categoryId?: string
  category?: {
    name: string,
    fontColor?: string,
    backgroundColor?: string
  }
}

export interface ProductDocument extends Product, MongoDocument {}