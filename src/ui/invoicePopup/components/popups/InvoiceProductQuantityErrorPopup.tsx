import { INVOICE_WARNINGS } from "@ui/invoicePopup/hooks/useInvoiceWarnings"

export default function InvoiceProductQuantityErrorPopup({
  isVisibleInvoiceProductQuantityErrorPopup,
  handleIsVisibleInvoicePopup,
  message
}: {
  isVisibleInvoiceProductQuantityErrorPopup: boolean,
  handleIsVisibleInvoicePopup: (invoiceWarning: INVOICE_WARNINGS) => void,
  message: string
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
      transition-opacity ${ isVisibleInvoiceProductQuantityErrorPopup ? "opacity-1" : "opacity-0" }
    `}>
      <div className="p-3">
        <div className="flex flex-row ">
          <div>
            { message }
          </div>  
          <div>
            <button 
              onClick={() => handleIsVisibleInvoicePopup(INVOICE_WARNINGS.UPDATE_PRODUCT_QUANTITY)} 
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