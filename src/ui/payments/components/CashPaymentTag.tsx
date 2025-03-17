import { PAYMENT_TYPE } from "@lib/db/schemas/payment/Payment"
import InvoiceStatusTag from "@ui/core/components/InvoiceStatusTag"
import { MouseEvent } from "react"

export default function CashPaymentTag({ 
  onClickSpan, 
  onClickRemove,
  isEditable
}: { 
  onClickSpan: (e: MouseEvent<HTMLSpanElement>) => void , 
  onClickRemove: (e: MouseEvent<HTMLButtonElement>) => void,
  isEditable: boolean
}) {
  return (
    <span
      className="inline-block mx-1 rounded-lg px-[6px]"
      onClick={onClickSpan}
      style={{
        background: "#E2E8F0",
      }}
    >
      Efectivo
      {
        isEditable &&
          <button 
            onClick={onClickRemove}
            className="
              ms-1 
              cursor-pointer 
              inline 
              text-inherit
            "
          >
            ⨉
          </button>
      }
    </span>
  )
}