import { Dispatch, SetStateAction } from "react";
import User from "./User";

export default interface SessionContext {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}