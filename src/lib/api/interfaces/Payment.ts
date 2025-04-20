export default interface Payment {
  PaymentID: String
  date: Date
  value: number
  type: "DIGITAL" | "CASH"
  bank?: string
}