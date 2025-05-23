import { createPortal } from "react-dom";
import { useContext } from "react";
import Image from "next/image";
import addCircleIcon from "@public/dashboard/add_circle.svg"
import InvoiceProductsTable from "../components/InvoiceProductsTable";
import INVOICE_POPUP_MODE from "../constants/InvoicePopupMode";
import { InvoicePopupContext } from "../hooks/InvoicePopupProvider";
import InvoiceForm from "../components/InvoiceForm";
import { INVOICE_WARNINGS } from "../hooks/useInvoiceWarnings";
import InvoiceMigratedCantChangeToCreatedPopup from "../components/InvoiceMigratedCantChangeToCreatedPopup";
import InvoiceDeletePaymentsPopup from "../components/InvoiceDeletePaymentsPopup";
import InvoiceSavePaymentPopup from "../components/InvoiceSavePaymentPopup";
import InvoiceRestaurePaymentsPopup from "../components/InvoiceRestaurePaymentsPopup";

export default function InvoicePopupView() {
  const {
    warnings,
    onChangePopupMode,
    invoicePopupMode,
    handleSave,
  } = useContext(InvoicePopupContext)
  const action = invoicePopupMode === INVOICE_POPUP_MODE.CREATE ? "Crea" : "Edita"
  
  const isBlockingButton = () => {
    const existsBlockingWarning =
      Array
        .from(warnings, ([, warning]) => { return warning.isBlocking })
        .find((isBlocking) => isBlocking === true)

    return existsBlockingWarning || false
  }

  return createPortal(
    <>
      {
        warnings.get(INVOICE_WARNINGS.INVOICE_MIGRATED_CANT_CHANGE_TO_CREATED)?.isVisible && 
          <InvoiceMigratedCantChangeToCreatedPopup />
      }
      {
        warnings.get(INVOICE_WARNINGS.DELETE_PAYMENTS)?.isVisible &&
          <InvoiceDeletePaymentsPopup />
      }
      {
        warnings.get(INVOICE_WARNINGS.SAVE_PAYMENT_QUESTION)?.isVisible &&
          <InvoiceSavePaymentPopup />
      }
      {
        warnings.get(INVOICE_WARNINGS.RESTAURE_PAYMENTS)?.isVisible &&
          <InvoiceRestaurePaymentsPopup />
      }
      <div
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
            w-[1024px]
            h-[100%]
            md:h-[80%]
            rounded-lg
            bg-white
            flex
            flex-col
            items-center
            py-5
            pb-[25px]
            px-[30px]
            relative
          "
        >
          <span className="text-[30px]">
            { action } tu factura
          </span>
          <div className="absolute flex w-full justify-end">
            <button 
              disabled={isBlockingButton()}
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
              onClick={handleSave}
            >
              <div className="inline-block me-[5px]">
                <Image
                  src={addCircleIcon.src}
                  alt={"add_circle_icon"}
                  width={20}
                  height={20}
                />
              </div>
              Guardar
            </button>
            <button 
              className="cursor-pointer text-[#7A7A7A] text-[20px] me-7"
              onClick={() => onChangePopupMode(INVOICE_POPUP_MODE.NONE)}
            >
              ⨉
            </button>
          </div>
          <InvoiceForm />
          <div className="mt-10 text-[#7A7A7A] flex flex-col flex-grow w-full">
            <InvoiceProductsTable />
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}