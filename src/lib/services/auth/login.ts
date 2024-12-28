import { createHash } from "crypto";
import { LoginFormData } from "@ui/login/interfaces/LoginFormData";
import find from "@lib/db/repositories/find";
import { UserDocument } from "@schemas/user/User";
import handleError from "@lib/util/error/handleError";

export async function validateCredentials(formData: LoginFormData): Promise<boolean> {
  let user: UserDocument
  try {
    [user] = (
      await find<UserDocument>(
        "users", 
        { username: formData.userName }
      )
    ).data
  } catch (err) {
    throw handleError(err)
  }

  if (!user) return false

  const hash = createHash("sha256").update(user.salt + formData.password).digest("hex")
  return user.password === hash
}