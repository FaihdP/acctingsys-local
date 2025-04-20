export default interface Invoice {
  InvoiceID: string,
  date: Date 
  value: number
  type: "SALE" | "BUY"
  status: "Pagada" | "En deuda"
  person?: string
}