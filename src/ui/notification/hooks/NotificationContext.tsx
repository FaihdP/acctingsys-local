'use client'

import { createContext, ReactNode, useState } from "react"
import INotificationContext from "../interfaces/NotificationContext"
import Notification from "../interfaces/Notification"

export const NotificationContext = createContext({} as INotificationContext)

export default function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Map<string, Notification>>(new Map())

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      { children }
    </NotificationContext.Provider>
  )
}
