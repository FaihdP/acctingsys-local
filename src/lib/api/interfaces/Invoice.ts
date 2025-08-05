export default interface Invoice {
  invoiceId: string,
  date: Date 
  value: number
  type: "SALE" | "BUY"
  status: "Pagada" | "En deuda"
  person?: string
}