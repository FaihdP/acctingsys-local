'use client'

import { createContext, ReactNode, useState } from "react"
import INotificationContext from "../interfaces/NotificationContext"
import Notification from "../interfaces/Notification"

export const NotificationsContext = createContext({} as INotificationContext)

export default function NotificationContext({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Map<string, Notification>>(new Map())

  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
      { children }
    </NotificationsContext.Provider>
  )
}
