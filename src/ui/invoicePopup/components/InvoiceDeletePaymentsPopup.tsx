import { useContext } from "react"
import { InvoicePopupContext } from "../hooks/InvoicePopupProvider"
import { INVOICE_WARNINGS } from "../hooks/useInvoiceWarnings"
import InvoiceStatusTag from "@ui/core/components/InvoiceStatusTag"
import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus"
import Image from "next/image"
import tableCancelIcon from "@public/core/table_cancel.svg"
import tableAcceptIcon from "@public/dashboard/table_accept.svg"

export default function InvoiceDeletePaymentsPopup() {
  const { handleIsVisibleInvoicePopup, handleInputChange } = useContext(InvoicePopupContext) 

  const handleClose = () => {
    handleIsVisibleInvoicePopup(INVOICE_WARNINGS.DELETE_PAYMENTS)
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
        <div className="absolute flex w-full justify-end">
          <button 
            className="cursor-pointer text-[#7A7A7A] text-[20px] me-4 mt-2"
            onClick={handleClose}
          >
            ⨉
          </button>
        </div>
        <div className="flex flex-col justify-center h-full py-10 text-center">
          <span className="text-[20px] ">
            ¿Está seguro de cambiar esta factura a <InvoiceStatusTag invoiceStatus={INVOICE_STATUS.CREATED} />?
          </span>
          <span className="mt-2 text-[#7A7A7A]">
            Se eliminaran todos los pagos asociados (luego pueden ser restaurados).
          </span>
          <div className="flex flex-row justify-center w-full mt-5">
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
              onClick={() => {
                handleInputChange("status", INVOICE_STATUS.CREATED)
                handleClose()
              }}
            >
              <div className="inline-block me-[5px]">
                <Image
                  src={tableAcceptIcon.src}
                  alt={"trash can icon"}
                  width={20}
                  height={20}
                />
              </div>
              Aceptar
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