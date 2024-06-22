export enum UserType {
  // TODO: modify user types
  ADMIN,
  USER
}

export default interface User {
  id: string
  username: string
  name: string
  lastname: string
  salt: string
  password: string
  type: UserType
}