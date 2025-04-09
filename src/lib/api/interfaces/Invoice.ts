export default interface Invoice {
  invoiceID: string,
  datetime: string 
  value: number
  type: "SALE" | "BUY"
  status: "Pagada" | "En deuda"
  person: string
}