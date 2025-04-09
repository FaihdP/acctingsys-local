'use client'

import { createContext, ReactNode, useState } from "react"
import INotificationContext from "../interfaces/NotificationContext"
import Notification from "../interfaces/Notification"
import { listen } from "@tauri-apps/api/event"

export const NotificationContext = createContext({} as INotificationContext)

export default function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Map<string, Notification>>(new Map())

  listen("migration", (event) => {
    console.log(event)
  })
  
  const handleDeleteNotification = (rowId: string) => {
    setNotifications((prevData) => {
      const newMap = new Map(prevData)
      newMap.delete(rowId)
      return newMap
    })
  }

  const handleAddNotification = (notification: Notification) => {
    setNotifications((prevData) => {
      const newMap = new Map(prevData)
      newMap.set("notification_" + notifications.size + 1, notification)
      return newMap
    })
  }

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications, handleAddNotification, handleDeleteNotification }}>
      { children }
    </NotificationContext.Provider>
  )
}
