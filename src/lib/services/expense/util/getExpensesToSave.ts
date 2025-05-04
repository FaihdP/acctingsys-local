import Expense from "@lib/db/schemas/expense/Exepense";

export default function getExpensesToSave(expenses: Expense[]): Expense[] {
  return expenses.map(expense => {
    const user: any = expense.user
    return {
      date: expense.date,
      value: expense.value,
      title: expense.title,
      description: expense.description,
      user: {
        name: user.name,
        lastname: user.lastname,
      },
      isDeleted: false,
      migrated: false,
      userId: user.userId,
    }
  })
} 