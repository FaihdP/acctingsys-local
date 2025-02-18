import find from "@lib/db/repositories/find"
import { UserDocument } from "@lib/db/schemas/user/User"

export default async function getUserByUsername(username: string): Promise<UserDocument> {
  let user: UserDocument
  [user] = (
    await find<UserDocument>(
      "users", 
      { username: username }
    )
  ).data
  return user
}