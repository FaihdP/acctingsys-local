export default interface Payment {
  paymentId: String
  date: Date
  value: number
  type: "DIGITAL" | "CASH"
  bank?: string
}