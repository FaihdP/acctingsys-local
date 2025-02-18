import User from "@ui/session/interfaces/User";

export default interface Token extends User {
  expiry: number
}