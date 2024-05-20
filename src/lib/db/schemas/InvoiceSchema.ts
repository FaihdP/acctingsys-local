interface Person {
  name: string,
  lastname: string
}

interface Product {
  name: string
}

export interface Invoice {
  date: string
  amount: number
  type: string
  userId?: string
  personId?: string
  isPaid?: boolean
  user: Person
  person?: Person
  productOverview?: Product[]
}