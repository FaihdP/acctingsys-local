import NotificationsIcon from "@public/dashboard/nav/NotificationsIcon";
import COLORS from "@ui/core/util/colors";
import { Dispatch, SetStateAction, useState } from "react";
import NotificationPopup from "../components/NotificationPopup";
import "../styles/notification.css"

export default function Notification({ 
  isOpen, 
  setIsOpen 
}: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) {
  const handleIsOpen = () => setIsOpen(!isOpen)

  return (
    <div
      className={`
        relative
        px-[30px] 
        h-[70px] 
        ${ isOpen ? "text-black" : "text-white"}
      `}
    > 
      <div className={`Notification ${ isOpen ? "is-open" : "" }`} onClick={handleIsOpen}>
        <div className="Notification-background" style={{ background: COLORS.GREEN }}/>
        <NotificationsIcon className="Notification-icon" />
      </div>
      { isOpen && <NotificationPopup handleIsOpen={handleIsOpen} />}
    </div>
  )
}