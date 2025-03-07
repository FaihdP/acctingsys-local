import { INVOICE_TYPE, InvoiceDocument } from "@lib/db/schemas/invoice/Invoice";
import INVOICE_POPUP_MODE from "@ui/invoicePopup/constants/InvoicePopupMode";
import InvoicePopup from "@ui/invoicePopup/containers/InvoicePopup";
import { Dispatch, SetStateAction } from "react";

export default function InvoiceBuyPopup({
  invoicePopupMode,
  onChangePopupMode,
  invoiceData
}: {
  invoicePopupMode: INVOICE_POPUP_MODE
  onChangePopupMode: Dispatch<SetStateAction<INVOICE_POPUP_MODE>>
  invoiceData: InvoiceDocument | null,
}) {
  return (
    <InvoicePopup 
      invoicePopupMode={invoicePopupMode}
      onChangePopupMode={onChangePopupMode}  
      invoiceData={invoiceData}
      invoiceType={INVOICE_TYPE.BUY}
    />
  )
}
