import { Dispatch, SetStateAction } from "react"
import INVOICE_POPUP_MODE from "../constants/InvoicePopupMode"
import { InvoiceDocument } from "@lib/db/schemas/invoice/Invoice"
import InvoicePopupProvider from "../hooks/InvoicePopupProvider"
import InvoicePopupWithoutContext from "./InvoicePopupWithoutContext"

interface InvoicePopupProps {
  invoicePopupMode: INVOICE_POPUP_MODE
  onChangePopupMode: Dispatch<SetStateAction<INVOICE_POPUP_MODE | null>>
  invoiceData: InvoiceDocument | null
}

export default function InvoicePopup({ 
  invoicePopupMode, 
  onChangePopupMode, 
  invoiceData 
}: InvoicePopupProps) {
  return (
    <InvoicePopupProvider
      data={{
        invoiceData,
        invoicePopupMode,
        onChangePopupMode
      }}
    >
      <InvoicePopupWithoutContext/>
    </InvoicePopupProvider>
  )
}