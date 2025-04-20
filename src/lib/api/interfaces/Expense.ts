export default interface Expense {
  ExpenseID: string,
  date: Date
  value: number
  title: string
  description?: string
}