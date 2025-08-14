import find from "@lib/db/repositories/find";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { UserDocument } from "@lib/db/schemas/user/User";

export default async function getUsers(filter: any) {
  return (
    await find<UserDocument>(
      COLLECTIONS.USERS, 
      filter,
      undefined,
      undefined,
      { name: 1, lastname: 1 }
    )
  )
} 