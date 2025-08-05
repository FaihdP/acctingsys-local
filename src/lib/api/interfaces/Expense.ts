export default interface Expense {
  expenseId: string,
  date: Date
  value: number
  title: string
  description?: string
}