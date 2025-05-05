import { createHash } from "crypto"

export default function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) throw new Error("Password and salt are required")
  return createHash("sha256").update(salt + password).digest("hex")
}