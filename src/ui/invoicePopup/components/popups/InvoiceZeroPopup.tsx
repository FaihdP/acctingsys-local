import { INVOICE_WARNINGS } from "@ui/invoicePopup/hooks/useInvoiceWarnings"
import InvoiceStatusTag from "@ui/core/components/InvoiceStatusTag"
import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus"

export default function InvoiceZeroPopup({
  isVisibleInvoiceZeroPopup,
  handleIsVisibleInvoicePopup
}: {
  isVisibleInvoiceZeroPopup: boolean,
  handleIsVisibleInvoicePopup: (invoiceWarning: INVOICE_WARNINGS) => void
}) {
  return (
    <div className={`
      absolute
      text-sm 
      xl:w-96
      w-56
      left-[86%]
      top-[12%]
      text-[#7A7A7A] 
      bg-white 
      rounded-lg 
      shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
      transition-opacity ${ isVisibleInvoiceZeroPopup ? "opacity-1" : "opacity-0" }
    `}>
      <div className="p-3">
        <div className="flex flex-row ">
          <div>
            Las facturas con estado <InvoiceStatusTag invoiceStatus={INVOICE_STATUS.DEBT} />
            o <InvoiceStatusTag invoiceStatus={INVOICE_STATUS.PAID} />
            deben tener un valor mayor a 0
          </div>  
          <div>
            <button 
              onClick={() => handleIsVisibleInvoicePopup(INVOICE_WARNINGS.TOTAL_INVOICE_IS_ZERO)} 
              className="
                ms-[10px]
                cursor-pointer 
                inline 
                text-inherit
              "
            >
              ⨉
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}