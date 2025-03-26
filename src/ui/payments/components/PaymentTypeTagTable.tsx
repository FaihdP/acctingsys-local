import { PAYMENT_TYPE } from "@lib/db/schemas/payment/Payment"
import { MouseEvent } from "react"

export default function PaymetTypeTagTable({ 
  onClickSpan, 
  onClickRemove,
  isEditable,
  paymentType,
}: { 
  onClickSpan: (e: MouseEvent<HTMLSpanElement>) => void , 
  onClickRemove: (e: MouseEvent<HTMLButtonElement>) => void,
  isEditable: boolean,
  paymentType: PAYMENT_TYPE,
}) {
  return (
    <span
      className="inline-block mx-1 rounded-lg px-[6px] bg-slate-200"
      onClick={onClickSpan}
    >
      { paymentType === PAYMENT_TYPE.CASH ? "Efectivo" : "Digital"}
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