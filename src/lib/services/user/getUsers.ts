import find from "@lib/db/repositories/find";
import { UserDocument } from "@lib/db/schemas/user/User";

export default async function getUsers(filter: any) {
  return (
    await find<UserDocument>(
      "users", 
      filter,
      undefined,
      undefined,
      { name: 1, lastname: 1 }
    )
  )
} 