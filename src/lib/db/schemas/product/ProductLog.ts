import Person from "@schemas/embedded/Person"
import MongoDocument from "@schemas/common/MongoDocument"

export interface ProductLog {
  productId: string
  date: string,
  description: string
  user: Person
}

export interface ProductLogDocument extends ProductLog, MongoDocument {}