import { Dispatch, SetStateAction, useContext } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import deleteIcon from "@public/dashboard/delete.svg"
import tableCancelIcon from "@public/core/table_cancel.svg"
import { NotificationContext } from "@ui/notification/hooks/NotificationProvider"
import NotificationType from "@ui/notification/interfaces/NotificationType"
import handleError from "@lib/util/error/handleError"
import { SessionContext } from "@ui/session/hooks/SessionProvider"

interface DeletePopupProps {
  onChangeIsVisible: Dispatch<SetStateAction<boolean>>,
  documentsToDelete: string[]
  handleDeleteDocument: (documentsToDelete: string[], userId: string) => Promise<void>  
  texts?: {
    principal?: string
    secondary?: string
    documentName?: string
  }
}

export default function DeletePopup({ 
  onChangeIsVisible, 
  documentsToDelete,
  handleDeleteDocument,
  texts
}: DeletePopupProps) {

  const isPlural = documentsToDelete.length > 1
  const handleClosePopup = () => onChangeIsVisible(false)
  const { handleAddNotification } = useContext(NotificationContext)
  const { user } = useContext(SessionContext)

  const handleClickAccept = async () => {
    try {
      await handleDeleteDocument(documentsToDelete, user.id)
      handleAddNotification({ 
        title: "Documento",
        text: `${ isPlural ? texts?.documentName || "documento" + "s" : texts?.documentName || "documento" } ha sido eliminado correctamente.`,
        type: NotificationType.OK
      })
    } catch (error) {
      handleAddNotification({ 
        title: "Documento",
        text: `El documento no pudo eliminarse.`,
        type: NotificationType.ERROR,
        showMore: <span>
          { handleError(error) }
        </span>
      })
    }
    handleClosePopup()
  }

  return createPortal(
    <>
      <div
        onClick={handleClosePopup}
        className="
          absolute 
          w-[100vw] 
          h-[100vh] 
          top-0 
          left-0 
          cursor-default 
          flex
          justify-center
          items-center
          bg-[rgba(0,0,0,0.26)]
          shadow-[0_0_30px_0px_rgba(0,0,0,0.25)]
        "
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className="
            rounded-lg
            bg-white
            flex
            flex-col
            items-center
            py-5
            px-20
            relative
          "
        >
          <div className="absolute flex w-full justify-end">
            <button className="cursor-pointer text-[#7A7A7A] text-[20px] me-7" onClick={handleClosePopup}>⨉</button>
          </div>
          {
            documentsToDelete.length > 0 &&
              <>
                <div className="text-[20px] mt-2">
                  ¿Estás seguro de eliminar <span className="font-bold">{ documentsToDelete?.length }</span> { texts?.principal }{ isPlural ? "s" : "" }?
                </div>
                <span className="mt-2 text-[#7A7A7A]">
                  { texts?.secondary }
                </span>
                <div className="mt-8 flex flex-row">
                  <button   
                    className="
                      me-[30px] 
                      flex 
                      items-center 
                      text-[#7A7A7A] 
                      bg-[#F4F4F4] 
                      ps-[8px]
                      pe-[10px] 
                      py-[5px] 
                      rounded-lg 
                      shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
                    "
                    onClick={handleClickAccept}
                  >
                    <div className="inline-block me-[5px]">
                      <Image
                        src={deleteIcon.src}
                        alt={"Trash can icon"}
                        width={20}
                        height={20}
                      />
                    </div>
                    Aceptar
                  </button>
                  <button 
                    className="
                      me-[30px] 
                      flex 
                      items-center 
                      text-[#7A7A7A] 
                      bg-[#F4F4F4] 
                      ps-[8px]
                      pe-[10px] 
                      py-[5px] 
                      rounded-lg 
                      shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
                    "
                    onClick={handleClosePopup}
                  >
                    <div className="inline-block me-[5px]">
                      <Image
                        src={tableCancelIcon.src}
                        alt={"Trash can icon"}
                        width={20}
                        height={20}
                      />
                    </div>
                    Cancelar
                  </button>
                </div>
              </>
          }
        </div>
      </div>
    </>,
    document.body
  )
}