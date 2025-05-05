import { createHash } from "crypto";
import { LoginFormData } from "@ui/login/interfaces/LoginFormData";
import { UserDocument } from "@schemas/user/User";

export async function validateCredentials(formData: LoginFormData, userData: UserDocument): Promise<boolean> {
  if (!userData) return false
  const hash = createHash("sha256").update(userData.salt + formData.password).digest("hex")
  return userData.password === hash
}