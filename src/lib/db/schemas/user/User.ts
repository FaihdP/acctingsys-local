export enum UserType {
  // TODO: modify user types
  ADMIN,
  USER
}

export default interface User {
  id: string
  name: string
  lastname: string
  password: string
  type: UserType
}