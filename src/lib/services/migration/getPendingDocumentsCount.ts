import getDocumentsToMigrate from "./getDocumentsToMigrate"

export default async function getPendingDocumentsCount() {
  const { invoices, payments, expenses } = await getDocumentsToMigrate()
  return {
    invoices: invoices.length,
    payments: payments.length,
    expenses: expenses.length
  }
}