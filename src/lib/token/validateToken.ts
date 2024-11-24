import Token from "./Token"
import TOKEN_RESPONSE from "./TokenResponse"

export default function validateToken(): TOKEN_RESPONSE {
  const token = localStorage.getItem("token")
  if (!token) return TOKEN_RESPONSE.VOID

  try {
    const { expiry }: Token = JSON.parse(token)
    return expiry > Date.now() ? TOKEN_RESPONSE.OK : TOKEN_RESPONSE.EXPIRED
  } catch {
    return TOKEN_RESPONSE.VOID
  }
}