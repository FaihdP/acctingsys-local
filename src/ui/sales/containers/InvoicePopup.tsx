import { Dispatch, SetStateAction } from "react"
import INVOICE_POPUP_MODE from "../constants/InvoicePopupMode"
import { InvoiceDocument } from "@lib/db/schemas/invoice/Invoice"
import SalesProvider from "../hooks/InvoicePopupProvider"
import InvoicePopupWithoutContext from "./InvoicePopupWithoutContext"

interface InvoicePopupWithContextProps {
  invoicePopupMode: INVOICE_POPUP_MODE
  onChangePopupMode: Dispatch<SetStateAction<INVOICE_POPUP_MODE | null>>
  invoiceData: InvoiceDocument | null
}

export default function InvoicePopup({ 
  invoicePopupMode, 
  onChangePopupMode, 
  invoiceData 
}: InvoicePopupWithContextProps) {
  return (
    <SalesProvider
      data={{
        invoiceData,
        invoicePopupMode,
        onChangePopupMode
      }}
    >
      <InvoicePopupWithoutContext/>
    </SalesProvider>
  )
}