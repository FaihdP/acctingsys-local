import { ReactNode } from "react"
import NotificationType from "./NotificationType"

export default interface Notification {
  title: string
  text: string
  type: NotificationType
  showMore?: ReactNode
}