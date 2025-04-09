export default interface Expense {
  expenseID: string,
  date: string
  value: number
  title: string
  description?: string
}