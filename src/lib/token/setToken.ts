import Token from "./Token"

export default function setToken(userName: string): void {
  const now = new Date()
  // Expiries in 10 days
  now.setDate(now.getDate() + 10)
  const token: Token = {
    userName,
    expiry: now.getTime()
  }
  localStorage.setItem("token", JSON.stringify(token))
}