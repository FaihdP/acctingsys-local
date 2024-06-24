import { createHash } from "crypto";
import { FormData } from "@lib/interfaces/loginFormData";
import find from "@lib/db/repositories/find";
import User from "@schemas/user/User";

export async function validateCredentials(formData: FormData): Promise<boolean> {
  const user: User = (
    await find<User>(
      "users", 
      { username: formData.userName }
    )
  )[0]

  const hash = createHash("sha256").update(user.salt + formData.password).digest("hex")
  return user.password === hash
}