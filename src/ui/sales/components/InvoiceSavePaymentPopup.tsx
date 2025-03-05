import { useContext } from "react"
import { INVOICE_WARNINGS } from "../hooks/useInvoiceWarnings"
import { InvoicePopupContext } from "../hooks/InvoicePopupProvider"
import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus"
import Image from "next/image"
import tableCancelIcon from "@public/core/table_cancel.svg"

export default function InvoiceSavePaymentPopup() {
  const { 
    handleIsVisibleInvoicePopup, 
    handleInputChange, 
    shouldSavePayment
  } = useContext(InvoicePopupContext) 

  const handleClose = () => {
    handleIsVisibleInvoicePopup(INVOICE_WARNINGS.SAVE_PAYMENT_QUESTION)
  }

  const handleChangeStatusAndClose = () => {
    handleInputChange("status", INVOICE_STATUS.PAID)
    handleClose()
  }

  const handleAccept = () => {
    shouldSavePayment.current = true
    handleChangeStatusAndClose()
  }

  return (  
    <div
      className="
        z-10
        absolute 
        w-[100vw] 
        h-[100vh] 
        top-0 
        left-0 
        cursor-default 
        flex
        justify-center
        items-center
      "
    >
      <div 
        className="
          w-[600px]
          rounded-lg
          bg-white
          flex
          flex-col
          items-center
          px-[30px]
          relative
          shadow-[0_0_30px_0px_rgba(0,0,0,0.2)]
        "
      >
        <div className="absolute flex w-full justify-end opacity-1">
          <button 
            className="cursor-pointer text-[#7A7A7A] text-[20px] me-4 mt-2"
            onClick={handleClose}
          >
            ⨉
          </button>
        </div>
        <div className="flex flex-col justify-center h-full py-10 text-center">
          <span className="text-[20px] ">
            ¿Desea registrar un pago por el mismo valor de la factura?
          </span>
          <span className="mt-2 text-[#7A7A7A]">
            El pago se registrará cuando se guarden los cambios realizados en la factura.
          </span>
          <div className="flex flex-row justify-center w-full mt-5">
            <button 
              className="
                me-[15px] 
                flex 
                items-center 
                text-[#7A7A7A] 
                bg-[#F4F4F4] 
                px-[12px]
                py-[5px] 
                rounded-lg 
                shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
              "
              onClick={handleAccept}
            >
              Si
            </button>
            <button 
              className="
                me-[30px] 
                flex 
                items-center 
                text-[#7A7A7A] 
                bg-[#F4F4F4] 
                px-[12px]
                py-[5px] 
                rounded-lg 
                shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
              "
              onClick={handleChangeStatusAndClose}
            >
              No
            </button>
            <button 
              className="
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
              onClick={handleClose}
            >
              <div className="inline-block me-[5px]">
                <Image
                  src={tableCancelIcon.src}
                  alt={"trash can icon"}
                  width={20}
                  height={20}
                />
              </div>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}