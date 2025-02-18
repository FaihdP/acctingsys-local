import { UserDocument } from "@lib/db/schemas/user/User"
import Token from "./Token"

export default function setToken(user: UserDocument): void {
  const now = new Date()
  // Expiries in 10 days
  now.setDate(now.getDate() + 10)
  const token: Token = {
    id: user._id.$oid,
    username: user.username,
    name: user.name,
    lastname: user.lastname,
    expiry: now.getTime()
  }
  localStorage.setItem("token", JSON.stringify(token))
}