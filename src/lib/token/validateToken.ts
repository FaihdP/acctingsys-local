import Token from "./Token"

export default function validateToken(): boolean {
  const token = localStorage.getItem("token")
  if (!token) return false

  try {
    const { expiry }: Token = JSON.parse(token)
    return expiry > Date.now()
  } catch {
    return false
  }
}