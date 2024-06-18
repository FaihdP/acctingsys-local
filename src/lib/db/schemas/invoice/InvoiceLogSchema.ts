export default interface InvoiceLog {
  invoiceId: string,
  date: string,
  action: string,
  description: string,
  userId: string
}