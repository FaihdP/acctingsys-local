import Token from "./Token"

export default function getToken(): Token | null {
  const token = localStorage.getItem("token")
  if (!token) return null
  return JSON.parse(token)
}