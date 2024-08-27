import find from "@lib/db/repositories/find";
import { UserDocument } from "@lib/db/schemas/user/User";

export default async function getUsers() {
  await new Promise(r => setTimeout(r, 5000));
  return (
    await find<UserDocument>(
      "users", 
      {}
    )
  )
} 