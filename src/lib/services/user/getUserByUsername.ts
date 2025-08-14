import find from "@lib/db/repositories/find"
import COLLECTIONS from "@lib/db/schemas/common/Collections"
import { UserDocument } from "@lib/db/schemas/user/User"

export default async function getUserByUsername(username: string): Promise<UserDocument> {
  let user: UserDocument
  [user] = (
    await find<UserDocument>(
      COLLECTIONS.USERS, 
      { username: username }
    )
  ).data
  return user
}