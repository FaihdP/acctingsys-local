import { useContext, useEffect } from "react";
import { NotificationContext } from "../hooks/NotificationProvider";
import Backdrop from "@ui/core/components/Backdrop";
import NotificationItem from "./NotificationItem";
import Notification from "../interfaces/Notification";
import NotificationType from "../interfaces/NotificationType";
import NotificationStyles from "../styles/NotificationTypesStyles";

export default function NotificationPopup({ handleIsOpen }: { handleIsOpen: () => void }) {
  const { 
    notifications, 
    setNotifications,
    handleDeleteNotification,
  } = useContext(NotificationContext)

  // useEffect(() => {
  //   setNotifications(new Map([
  //     [ 
  //       "notification_1", 
  //       { 
  //         title: "Factura guardada",
  //         text: "La factura fue guardada existosamente",
  //         type: NotificationType.OK
  //       }
  //     ],
  //     [
  //       "notification_2",
  //       {
  //         title: "Ejemplo",
  //         text: "Este es un ejemplo del texto de una notificación",
  //         type: NotificationType.INFO,
  //       }
  //     ],
  //     [
  //       "notification_3",
  //       {
  //         title: "Ejemplo",
  //         text: "Este es un ejemplo del texto de una notificación. Este es un ejemplo del texto de una notificación. Este es un ejemplo del texto de una notificación",
  //         type: NotificationType.OK,
  //         showMore: <span>XD</span>
  //       }
  //     ],
  //     [
  //       "notification_4",
  //       {
  //         title: "Ejemplo",
  //         text: "Este es un ejemplo del texto de una notificación",
  //         type: NotificationType.WARNING,
  //       }
  //     ],
  //     [
  //       "notification_5",
  //       {
  //         title: "Ejemplo",
  //         text: "Este es un ejemplo del texto de una notificación",
  //         type: NotificationType.WARNING,
  //       }
  //     ],
  //     [
  //       "notification_6",
  //       {
  //         title: "Ejemplo",
  //         text: "Este es un ejemplo del texto de una notificación",
  //         type: NotificationType.WARNING,
  //       }
  //     ],
  //     [
  //       "notification_7",
  //       {
  //         title: "Ejemplo",
  //         text: "Este es un ejemplo del texto de una notificación",
  //         type: NotificationType.WARNING,
  //       }
  //     ],
  //     [
  //       "notification_8",
  //       {
  //         title: "Ejemplo",
  //         text: "Este es un ejemplo del texto de una notificación",
  //         type: NotificationType.WARNING,
  //       }
  //     ],
  //     [
  //       "notification_9",
  //       {
  //         title: "Ejemplo",
  //         text: "Este es un ejemplo del texto de una notificación",
  //         type: NotificationType.WARNING,
  //       }
  //     ],
  //     [
  //       "notification_10",
  //       {
  //         title: "Ejemplo",
  //         text: "Este es un ejemplo del texto de una notificación",
  //         type: NotificationType.WARNING,
  //       }
  //     ],
  //     [
  //       "notification_11",
  //       {
  //         title: "Ejemplo",
  //         text: "Este es un ejemplo del texto de una notificación",
  //         type: NotificationType.WARNING,
  //       }
  //     ],
  //     [
  //       "notification_12",
  //       {
  //         title: "Ejemplo",
  //         text: "Este es un ejemplo del texto de una notificación",
  //         type: NotificationType.WARNING,
  //       }
  //     ],
  //     [
  //       "notification_13",
  //       {
  //         title: "Ejemplo",
  //         text: "Este es un ejemplo del texto de una notificación",
  //         type: NotificationType.WARNING,
  //       }
  //     ],
  //     [
  //       "notification_14",
  //       {
  //         title: "Ejemplo",
  //         text: "Este es un ejemplo del texto de una notificación",
  //         type: NotificationType.WARNING,
  //       }
  //     ]
  //   ]))
  // }, [setNotifications])

  return (
    <>
      {/* <Backdrop onClick={handleIsOpen} /> */}
      <div 
        style={{ fontSize: "12px" }}
        className="
          Notification-popup          
          min-h-[600px]
          max-h-[100%]
          overflow-auto
          shadow-[0_0_30px_0px_rgba(0,0,0,0.2)]
          rounded-lg
        "
      >
        <div className="absolute top-0 right-0">
          <button onClick={handleIsOpen} className="cursor-pointer text-[#7A7A7A] text-[18px] me-4 mt-1">⨉</button>
        </div>
        <div className="text-center text-[#7A7A7A] font-bold text-[14px] my-[8px] w-full">Notificaciones</div>
        {  
          Array
            .from(notifications, ([key, notification]) => { return { key, notification}} )
            .reverse()
            .map(({ key, notification }: { key: string, notification: Notification}, index: number) => 
              <NotificationItem 
                key={index}
                rowId={key}
                notification={notification}
                notificationStyles={NotificationStyles.get(notification.type)}
                onClickDelete={handleDeleteNotification}
              />
            )
        }
        
      </div>
    </>
  )
}
