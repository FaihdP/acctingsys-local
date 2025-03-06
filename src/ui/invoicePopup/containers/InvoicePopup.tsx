import { Dispatch, SetStateAction } from "react"
import INVOICE_POPUP_MODE from "../constants/InvoicePopupMode"
import { InvoiceDocument, INVOICE_TYPE } from "@lib/db/schemas/invoice/Invoice"
import InvoicePopupProvider from "../hooks/InvoicePopupProvider"
import InvoicePopupWithoutContext from "./InvoicePopupWithoutContext"

interface InvoicePopupProps {
  invoicePopupMode: INVOICE_POPUP_MODE
  onChangePopupMode: Dispatch<SetStateAction<INVOICE_POPUP_MODE>>
  invoiceData: InvoiceDocument | null,
  invoiceType: INVOICE_TYPE
}

export default function InvoicePopup({ 
  invoicePopupMode, 
  onChangePopupMode, 
  invoiceData,
  invoiceType
}: InvoicePopupProps) {
  return (
    <InvoicePopupProvider
      data={{
        invoiceData,
        invoicePopupMode,
        invoiceType,
        onChangePopupMode
      }}
    >
      <InvoicePopupWithoutContext/>
    </InvoicePopupProvider>
  )
}