import Person from "@schemas/embedded/Person"

export default interface Payment {
  date: string
  value: number
  title: string
  description?: string
  userId: string
  migrated: boolean
  user: Person
}