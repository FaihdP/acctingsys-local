import { Dispatch, SetStateAction } from "react";
import Notification from "./Notification";

export default interface NotificationContext {
  notifications: Map<string, Notification>,
  setNotifications: Dispatch<SetStateAction<Map<string, Notification>>>
  handleDeleteNotification: (rowId: string) => void
  handleAddNotification: (notification: Notification) => void
}