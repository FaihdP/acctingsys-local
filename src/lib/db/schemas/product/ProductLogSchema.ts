import Person from "@schemas/embedded/Person"

export interface ProductLog {
  productId: string
  date: string,
  description: string
  user: Person
}