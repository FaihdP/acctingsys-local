import Person from "@schemas/embedded/Person"
import MongoDocument from "@schemas/common/MongoDocument"

export default interface Expense {
  date: string
  value: number
  title: string
  description?: string
  userId: string
  migrated: boolean
  user: Person
}

export interface ExpenseDocument extends Expense, MongoDocument {}