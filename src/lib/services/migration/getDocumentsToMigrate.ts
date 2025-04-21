import getExpensesToMigrate from "../expense/getExpensesToMigrate"
import getInvoicesToMigrate from "../invoice/getInvoicesToMigrate"
import getPaymentsToMigrate from "../payment/getPaymentsToMigrate"

export default async function getDocumentsToMigrate() {
  const invoices = await getInvoicesToMigrate()
  const payments = await getPaymentsToMigrate()
  const expenses = await getExpensesToMigrate()
  return { invoices, payments, expenses }
}