import { randomBytes } from "crypto";

export function generateSalt() {
  // Generate 16-character random salt 
  return randomBytes(12).toString("base64")
}