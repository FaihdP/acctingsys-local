import save from "@lib/db/repositories/save";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import User, { UserDocument, UserStatus, UserType } from "@lib/db/schemas/user/User";
import handleError from "@lib/util/error/handleError";
import { generateSalt } from "@lib/util/salt";
import { RegisterFormData } from "@ui/login/interfaces/RegisterFormData";
import encryptPassword from "../auth/encryptPassword";
import { SaveResult } from "../invoice/saveInvoices";

export default async function saveUser(formData: RegisterFormData): Promise<UserDocument> {
  try {
    const { user, identification, names, lastnames } = formData
    const salt = generateSalt()
    const newUser = {
      username: user.trim().toLowerCase(),
      identification,
      name: names,
      lastname: lastnames || "",
      password: encryptPassword(formData.password, salt),
      salt,
      isDeleted: false,
      state: UserStatus.ACTIVE,
      type: UserType.USER
    }

    const id = (await save<User>(COLLECTIONS.USERS, [newUser]) as SaveResult).insertedIds[0]
    return {
      _id: id,
      ...newUser,
      __v: 0,
    }
  } catch (error) {
    throw handleError(error)
  }
}