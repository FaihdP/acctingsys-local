import Person from "@schemas/embedded/Person"

export interface Product {
  name: string
  value?: string
  description?: string
  type?: string
  userId: string
  user: Person
}