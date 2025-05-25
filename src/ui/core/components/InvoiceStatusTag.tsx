import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus"
import INVOICE_STATUS_COLORS from "@ui/core/constants/InvoiceStatusColors"
import { MouseEvent, ReactNode } from "react"

export default function InvoiceStatusTag({ 
  invoiceStatus,
  onClick,
  children,
}: { 
  invoiceStatus: INVOICE_STATUS,
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void,
  children?: ReactNode
}) {
  const invoiceColors = INVOICE_STATUS_COLORS[invoiceStatus]
  return (
    <span
      className="inline-block mx-1 rounded-lg px-[6px]"
      onClick={onClick}
      style={{
        backgroundColor: "#" + invoiceColors?.backgroundColor,
        color: "#" + invoiceColors?.fontColor
      }}
    >
      { invoiceStatus }
      { children }
    </span>
  )
}
