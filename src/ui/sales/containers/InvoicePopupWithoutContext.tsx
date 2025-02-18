import { createPortal } from "react-dom";
import { useContext } from "react";
import Image from "next/image";
import addCircleIcon from "@public/dashboard/add_circle.svg"
import InvoiceProductsTable from "../components/InvoiceProductsTable";
import INVOICE_POPUP_MODE from "../constants/InvoicePopupMode";
import { InvoicePopupContext } from "../hooks/InvoicePopupProvider";
import InvoiceForm from "../components/InvoiceForm";

export default function InvoicePopupWithoutContext() {
  const {
    errors,
    onChangePopupMode,
    invoicePopupMode,
    handleSave
  } = useContext(InvoicePopupContext)
  
  return createPortal(
    <>
      <div
        onClick={() => onChangePopupMode(null)}
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
            h-[780px]
            rounded-lg
            bg-white
            flex
            flex-col
            items-center
            py-5
            px-[30px]
            relative
          "
        >
          <span className="text-[30px]">
            { invoicePopupMode === INVOICE_POPUP_MODE.CREATE ? "Crea" : "Edita" } tu factura
          </span>
          <div className="absolute flex w-full justify-end">
            <button 
              disabled={errors.size > 0 && errors.get("totalValue")}
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
              onClick={() => onChangePopupMode(null)}
            >
              ⨉
            </button>
          </div>
          <InvoiceForm />
          <div className="mt-10 text-[#7A7A7A] h-full w-full">
            <InvoiceProductsTable />
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}