import find from "@lib/db/repositories/find";
import { UserDocument } from "@lib/db/schemas/user/User";

export default async function getUsers(filter: any) {
  //await new Promise(r => setTimeout(r, 5000))
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