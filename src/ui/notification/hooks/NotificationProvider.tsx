'use client'

import { createContext, ReactNode, useState } from "react"
import INotificationContext from "../interfaces/NotificationContext"
import Notification from "../interfaces/Notification"

export const NotificationContext = createContext({} as INotificationContext)

export default function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Map<string, Notification>>(new Map())
  let notificationsCount = 0
  
  const handleDeleteNotification = (rowId: string) => {
    setNotifications((prevData) => {
      const newMap = new Map(prevData)
      newMap.delete(rowId)
      return newMap
    })
  }

  const handleAddNotification = (notification: Notification) => {
    const notificationID = "notification_" + (notificationsCount++).toString()
    setNotifications((prevData) => {
      const newMap = new Map(prevData)
      newMap.set(notificationID, notification)
      return newMap
    })
    return notificationID
  }

  const handleUpdateNotification = (notificationId: string, notification: Notification) => {
    setNotifications((prevData) => {
      const newMap = new Map(prevData)
      newMap.set(notificationId, notification)
      return newMap
    })
  }

  return (
    <NotificationContext.Provider value={{ 
        notifications, 
        setNotifications, 
        handleAddNotification, 
        handleUpdateNotification, 
        handleDeleteNotification 
      }}>
      { children }
    </NotificationContext.Provider>
  )
}
