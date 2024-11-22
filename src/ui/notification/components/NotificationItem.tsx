import { ReactNode, useState } from "react"
import Notification from "../interfaces/Notification"

export default function NotificationItem({ 
  rowId,
  notification,
  notificationStyles,
  onClickDelete
}: { 
  rowId: string
  notification: Notification
  notificationStyles?: { 
    firstColor: string
    secondColor: string 
    textColor: string
    icon: ReactNode
  }
  onClickDelete: (key: string) => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div 
      className="flex w-full min-h-[65px] mb-[5px]"
      style={{ 
        background: notificationStyles?.firstColor || "inheirt",
        color: notificationStyles?.textColor || "inheirt",
      }}
    >
      <div 
        style={{ background: notificationStyles?.secondColor || "inheirt" }}
        className={`w-[2px]`} 
      />
      <div className="flex h-full w-full px-[12px] py-[15px]">
        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between font-semibold">
            <div className="flex items-center">
              <div style={{ color: notificationStyles?.secondColor || "inheirt" }}>
                { notificationStyles?.icon }
              </div>
              <span style={{ marginLeft: notificationStyles?.icon ? "8px" : "24px" }}>{notification.title}</span>
            </div>
            <span className="cursor-pointer" onClick={(e) => onClickDelete(rowId)}>⨉</span>
          </div>
          <span className="mt-[6px] ms-[24px]">{notification.text}</span>
          { 
            (notification.showMore && !isExpanded) && 
              <a 
                onClick={() => setIsExpanded(!isExpanded)}
                className="
                  font-bold 
                  mt-[6px] 
                  ms-[24px] 
                  cursor-pointer
                ">
                Ver mas...
              </a> 
          }
          { 
            isExpanded && 
              <span className="mt-[6px] ms-[24px]">{notification.showMore}</span>
          }
          { 
            (notification.showMore && isExpanded) && 
              <a 
                onClick={() => setIsExpanded(!isExpanded)}
                className="
                  font-bold 
                  mt-[6px] 
                  ms-[24px] 
                  cursor-pointer
                ">
                Ver menos...
              </a> 
          }
        </div>
      </div>
    </div>
  )
}
