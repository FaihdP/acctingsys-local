export default interface Payment {
  paymentID: String
  date: string
  value: number
  type: "DIGITAL" | "CASH"
  bank?: string
}