'use client'

import { createContext, ReactNode, useEffect, useState } from "react"
import ISessionContext from "../interfaces/SessionContext"
import User from "../interfaces/User"
import getToken from "@lib/token/getToken"

export const SessionContext = createContext({} as ISessionContext)

export default function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    lastname: "",
    username: ""
  })

  useEffect(() => {
    const userData = getToken()
    if (!userData) return
    setUser({
      id: userData.id,
      name: userData.name,
      lastname: userData.lastname,
      username: userData.username
    })
  }, [])

  return (
    <SessionContext.Provider value={{
      user,
      setUser
    }}>
      { children }
    </SessionContext.Provider>
  )
}
