import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus";
import InvoiceStatusTag from "@ui/core/components/InvoiceStatusTag";
import { MouseEvent } from "react";

export default function InvoiceStatusTagTable({ 
  onClickSpan, 
  onClickRemove,
  isEditable,
  invoiceStatus
}: { 
  onClickSpan: (e: MouseEvent<HTMLSpanElement>) => void , 
  onClickRemove: (e: MouseEvent<HTMLButtonElement>) => void,
  isEditable: boolean,
  invoiceStatus: INVOICE_STATUS
}) {
  return (
    <InvoiceStatusTag 
      invoiceStatus={invoiceStatus} 
      onClick={onClickSpan}
    >
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
    </InvoiceStatusTag>
  )
}
