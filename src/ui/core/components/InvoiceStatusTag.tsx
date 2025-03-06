import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus"
import INVOICE_STATUS_COLORS from "@ui/core/constants/InvoiceStatusColors"

export default function InvoiceStatusTag({ invoiceStatus }: { invoiceStatus: INVOICE_STATUS }) {
  const invoiceColors = INVOICE_STATUS_COLORS[invoiceStatus]
  return (
    <span
      className="inline-block mx-1 rounded-lg px-[6px]"
      style={{
        background: invoiceColors?.background,
        color: invoiceColors?.fontColor
      }}
    >
      { invoiceStatus }
    </span>
  )
}
