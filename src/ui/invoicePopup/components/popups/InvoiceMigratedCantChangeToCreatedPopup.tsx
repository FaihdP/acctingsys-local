import { useContext } from "react"
import { InvoicePopupContext } from "@ui/invoicePopup/hooks/InvoicePopupProvider"
import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus"
import { INVOICE_WARNINGS } from "@ui/invoicePopup/hooks/useInvoiceWarnings"
import InvoiceStatusTag from "@ui/core/components/InvoiceStatusTag"

export default function InvoiceMigratedCantChangeToCreatedPopup() {
  const { handleIsVisibleInvoicePopup } = useContext(InvoicePopupContext) 
  
  const handleClose = () => {
    handleIsVisibleInvoicePopup(INVOICE_WARNINGS.INVOICE_MIGRATED_CANT_CHANGE_TO_CREATED)
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
          w-[500px]
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
          <span className="text-[20px] text-[#7A7A7A]">
            No es posible cambiar esta factura a 
            <InvoiceStatusTag invoiceStatus={INVOICE_STATUS.CREATED} />
            debido a que la factura y/o los pagos asociados ya fueron migrados
          </span>
          <div className="flex flex-row justify-center w-full mt-5">
            <button 
              onClick={handleClose}
              className="
                flex 
                items-center 
                text-[#7A7A7A] 
                bg-[#F4F4F4] 
                px-[15px]
                py-[5px] 
                rounded-lg 
                shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
              "
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}