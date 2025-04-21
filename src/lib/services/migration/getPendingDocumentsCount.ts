import getDocumentsToMigrate from "./getDocumentsToMigrate"

export default async function getPendingDocumentsCount() {
  await new Promise(resolve => setTimeout(resolve, 5000))
  const { invoices, payments, expenses } = await getDocumentsToMigrate()
  return {
    invoices: invoices.length,
    payments: payments.length,
    expenses: expenses.length
  }
}