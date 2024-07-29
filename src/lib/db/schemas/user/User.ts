import MongoDocument from "@schemas/common/MongoDocument"

export enum UserType {
  // TODO: modify user types
  ADMIN,
  USER
}

export enum UserStatus {
  ACTIVE,
  INACTIVE
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
}

export interface UserDocument extends User, MongoDocument {}