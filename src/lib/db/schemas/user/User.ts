import MongoDocument from "@schemas/common/MongoDocument"

export enum UserType {
  // TODO: modify user types
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export default interface User {
  identification: string
  username: string
  name: string
  lastname: string
  salt: string
  password: string
  type: UserType
  state: UserStatus
  isDeleted: boolean
}

export interface UserDocument extends User, MongoDocument {}